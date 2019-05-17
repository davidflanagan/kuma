from __future__ import print_function

import json
import os

import requests
import requests.exceptions
from django.conf import settings
from django.utils import lru_cache
from django_jinja import library


@lru_cache.lru_cache()
def get_localization_data(locale):
    """
    Read the frontend string catalog for the specified locale, parse
    it as JSON, and return the resulting dict. The returned values
    are cached so that we don't have to read files all the time.
    """
    path = os.path.join(settings.BASE_DIR,
                        'static', 'jsi18n',
                        locale, 'react.json')
    with open(path, 'r') as f:
        return json.load(f)


@library.global_function
def render_react_app(locale, document_data, request_data, ssr=True):
    """
    Render a script tag to define the data and any other HTML tags needed
    to enable the display of a React-based UI. By default, this does
    server side rendering, falling back to client-side rendering if
    the SSR attempt fails. Pass False as the second argument to do
    client-side rendering unconditionally.

    Note that we are not defining a generic Jinja template tag here.
    The code in this file is specific to Kuma's React-based UI.
    """
    data = {
        'localizationData': get_localization_data(locale),
        'documentData': document_data,
        'requestData': request_data
    }

    if ssr:
        return server_side_render(data)
    else:
        return client_side_render(data)


def _render(html, state):
    """A utility function used by both client side and server side rendering.
    Returns a string that includes the specified HTML and a serialized
    form of the state dict, in the format expected by the client-side code
    in kuma/javascript/src/index.jsx.
    """
    # Serialize the state object to JSON and be sure the string
    # "</script>" does not appear in it, since we are going to embed it
    # within an HTML <script> tag.
    serializedState = json.dumps(state).replace('</', '<\\/')

    # Now return the HTML and the state as a single string
    return (
        u'<div id="react-container">{}</div>\n'
        u'<script>window._react_data = {};</script>\n'
    ).format(html, serializedState)


def client_side_render(data):
    """
    Output an empty <div> and a script with complete state so that
    the UI can be rendered on the client-side.
    """
    return _render('', data)


def server_side_render(data):
    """
    Pre-render the React UI to HTML and output it in a <div>, and then
    also pass the necessary serialized state in a <script> so that
    React on the client side can sync itself with the pre-rendred HTML.

    If any exceptions are thrown during the server-side rendering, we
    fall back to client-side rendering instead.
    """
    url = settings.SSR_URL
    timeout = settings.SSR_TIMEOUT

    # Try server side rendering
    try:
        # POST the document data as JSON to the SSR server and we
        # should get HTML text (encoded as plain text) in the body
        # of the response
        response = requests.post(url,
                                 headers={'Content-Type': 'application/json'},
                                 data=json.dumps(data).encode('utf8'),
                                 timeout=timeout)

        # Even though we've got fully rendered HTML now, we still need to
        # send the document data along with it so that React can sync its
        # state on the client side with what is in the HTML.  Fortunately,
        # however, it turns out not to be necessary to duplicate the
        # biggest parts (the HTML strings) of that data, so we can delete
        # those from the data now. We do this in a copy of the original
        # dict because the data structure belongs to our caller, not to us.
        data = data.copy()
        data['documentData'] = data['documentData'].copy()
        data['documentData'].update(bodyHTML='', tocHTML='', quickLinksHTML='')
        return _render(response.text, data)

    except requests.exceptions.ConnectionError:
        print("Connection error contacting SSR server.")
        print("Falling back to client side rendering.")
        return client_side_render(data)
    except requests.exceptions.ReadTimeout:
        print("Timeout contacting SSR server.")
        print("Falling back to client side rendering.")
        return client_side_render(data)
