//global vars
var fetched = false;

//Initialize fullScroll
new fullScroll({
    mainElement: 'main',
    displayDots: false,
    dotsPosition: 'left',
    animateTime: 0.7,
    animateFunction: 'cubic-bezier(.35,.06,.25,.97)'
});
//InstaFeed for Mobile
new InstagramFeed({
    'username': 'dipti.illustration',
    'container': document.getElementById("instagram-feed-mobile"),
    'display_profile': false,
    'display_biography': false,
    'display_gallery': true,
    'callback': null,
    'styling': true,
    'items': 4,
    'items_per_row': 2,
    'margin': 1
});
//Instafeed for Desktop
new InstagramFeed({
    'username': 'dipti.illustration',
    'container': document.getElementById("instagram-feed"),
    'display_profile': false,
    'display_biography': false,
    'display_gallery': true,
    'get_data': false,
    'callback': null,
    'styling': true,
    'items': 4,
    'items_per_row': 4,
    'margin': .5
});

//Check for mobile device and display appropriate div
function checkForMobile(isMobile) {
    if (isMobile.matches) { // If media query matches
        $('#instagram-feed').hide();
        $('#instagram-feed-mobile').show();
    } else {
        $('#instagram-feed-mobile').hide();
        $('#instagram-feed').show();
    }
}

var isMobile = window.matchMedia("(max-width: 700px)")
checkForMobile(isMobile)
isMobile.addListener(checkForMobile)
//--end

$(document).ready(function () {
    execOperation();
    appendHeading();
})


// waitUntil(250, 10, function condition() {
//     return (document.getElementsByClassName('instagram_gallery').length>0 ? true : false);
// }, function done(result) {
//     var temp = document.getElementsByClassName('instagram_gallery');
//     console.log(temp)
//     for (let index = 0; index < temp.length; index++) {
//         const element = temp[index];
//         element.insertAdjacentHTML('beforebegin', '<h1>TEST</h1>')
//     }
//     // result is true on success or false if the condition was never met
// });
function appendHeading() {
    waitUntil(250, 10, function condition() {
        return (document.getElementsByClassName('instagram_gallery').length > 1 ? true : false);
    }, function done(result) {
        var temp = document.getElementsByClassName('instagram_gallery');
        console.log(temp)
        for (let index = 0; index < temp.length; index++) {
            const element = temp[index];
            element.insertAdjacentHTML('beforebegin', '<h1>Latest stuff from my Insta</h1>')
        }
    })
}

function execOperation() {
    var temp = $('#personalAttribute').html();
    temp = temp.split(' ').join(' ∙ ').split(' ')
    var color = gen_hex(temp.length);
    for (let i = 0; i < temp.length; i++) {
        // temp[i] = '<span style =" color:' + color[i] + '; background-color: '+ invertColor(color[i]) + '">' + temp[i] + "</span>";
        temp[i] = '<span style =" color:' + color[i] + '">' + temp[i] + "</span>";
    }
    temp = temp.join(' ')
    $('#personalAttribute').html(temp);
}

const rgb2hex = (rgb) => {
    return (rgb && rgb.length === 3) ? "#" +
        ("0" + parseInt(rgb[0], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) : '';
}

// next two methods converted from Ruby to JS
// soured from http://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/

// # HSV values in [0..1[
// # returns [r, g, b] values from 0 to 255
const hsv_to_rgb = (h, s, v) => {
    const h_i = Math.floor(h * 6)
    const f = h * 6 - h_i
    const p = v * (1 - s)
    const q = v * (1 - (f * s))
    const t = v * (1 - (1 - f) * s)
    let r, g, b
    switch (h_i) {
        case (0):
            [r, g, b] = [v, t, p]
            break
        case (1):
            [r, g, b] = [q, v, p]
            break
        case (2):
            [r, g, b] = [p, v, t]
            break
        case (3):
            [r, g, b] = [p, q, v]
            break
        case (4):
            [r, g, b] = [t, p, v]
            break
        case (5):
            [r, g, b] = [v, p, q]
            break
    }
    return [Math.floor(r * 256), Math.floor(g * 256), Math.floor(b * 256)]
}

// # use golden ratio
const golden_ratio_conjugate = 0.9618033988749895 //remove the initial 9
let h = Math.random() // # use random start value
const gen_hex = (numberOfColors) => {
    const colorArray = []
    while (numberOfColors > 0) {
        h += golden_ratio_conjugate
        h %= 1
        colorArray.push(rgb2hex(hsv_to_rgb(h, 0.8, 0.8)))
        numberOfColors -= 1
    }
    console.log(colorArray)
    return colorArray
}

function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // http://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ?
            '#000000' :
            '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);

    function padZero(str, len) {
        len = len || 2;
        var zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    }
}