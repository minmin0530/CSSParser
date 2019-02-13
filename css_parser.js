window.onload = function() {
    load_css();
}
async function load_css() {
    parse(await fetch('style.css').then((response) => response.text()));
}

function parse(css) {
    const NEW_LINE = '<br>';
    css = css.replace(/\r?\n/g, NEW_LINE);
    let element = document.getElementsByTagName('article')[0];
    let pos = css.indexOf('{');
    let begin = css.lastIndexOf(NEW_LINE, pos);
    let token = '';
    if (begin == -1) {
        token = css.substring(0, pos);
    } else {
        token = css.substring(begin + 4, pos);
    }
    let end = css.indexOf('}', pos) + 1;
    let body = css.substring(pos, end);

    let lines = [];
    let lineBegin = 0;
    let linePos = 0;

    while (linePos != -1) {
        linePos = body.indexOf(NEW_LINE, lineBegin);
        if (linePos != -1) {
            lines.push(body.substring(lineBegin, linePos));
            lineBegin = linePos + 4;
            element.innerHTML += lines[lines.length - 1] + '<br>';
        }
    }
    lines.push(body.substring(lineBegin, body.length));
    element.innerHTML += lines[lines.length - 1];

    // linePos = body.indexOf(NEW_LINE, linePos + 1);
    // lines.push(body.substring(lineBegin, linePos));



//     const length = body.length;
//     let propertyBegin = 0;
//     let propertyPos = 0;
//     let property = '';
//     while (propertyPos < length) {
//         propertyPos = body.indexOf(':', propertyBegin);
//         propertyBegin = body.lastIndexOf(NEW_LINE, propertyPos);
//         if (propertyBegin == -1) {
//             property = body.substring(0, propertyPos);
//         } else {
//             property = body.substring(propertyBegin + 4, propertyPos);
//         }
//         body = body.replace(property, '<span style="color:blue;">' + property + '</span>');
//         propertyBegin = propertyPos + 1;
//         propertyPos = body.indexOf(':', propertyPos + 1);
//         console.log(body.length + ':'+ property);
    
// //        element.innerHTML += property;
//     }
//     element.innerHTML = '<div contenteditable><span style="color:red;">' + token + '</span>' + body + '</div>';
}