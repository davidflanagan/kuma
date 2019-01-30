const bcd = require('mdn-browser-compat-data');

const URL_PREFIX = 'https://developer.mozilla.org/docs/';

let index = {};

function traverse(tree, path) {
    if (!tree || path === 'browsers') {
        return;
    }

    if (tree.__compat && tree.__compat.mdn_url) {
        if (index[path]) {
            console.log("Already seen", path);
        } else {
            let url = tree.__compat.mdn_url;
            if (url.startsWith(URL_PREFIX)) {
                url = url.substring(URL_PREFIX.length);
            }
            index[path] = url;
        }
    }

    for(let key of Object.keys(tree)) {
        if (key !== '__compat') {
            traverse(tree[key], path ? path + '.' + key : key)
        }
    }
}

traverse(bcd, '');
console.log(JSON.stringify(index));

/**
 * Easy to compress like this, but doesn't add much that gzip doesn't do
let paths = Object.keys(index);
paths.sort();

let newindex = {};

let lastpath = null;
let lasturl = null;
for(let path of paths) {
    let url = index[path];
    let p, u;
    if (lastpath && path.startsWith(lastpath)) {
        p = '~' + path.slice(lastpath.length);
    } else {
        p = path
        lastpath = path;
    }

    if (lasturl && url.startsWith(lasturl)) {
        u = '~' + url.slice(lasturl.length);
    }
    else {
        u = url
        lasturl = url;
    }

    console.log(p, u);
}
*/
