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

var isMobile = window.matchMedia("(max-width: 750px)")
checkForMobile(isMobile)
isMobile.addListener(checkForMobile)
//--end

$(document).ready(function () {
    execOperation();
    appendHeading();
    $('.nav-link').click(function () {
        $('.collapse').collapse('hide')
    });
    $('#navToggle').click(function () {
        var isChecked = $(this).is(':checked')
        if (isChecked) {
            $('#mainNav').removeClass('bg-none')
            $('#mainNav').addClass('nav-bg')
            $('#collapsibleNavbar').collapse('show')
            

        } else {
             $('#mainNav').removeClass('nav-bg');
            $('#mainNav').addClass('bg-none');
            $('#collapsibleNavbar').collapse('hide')
        }


        //var parent = $(this).parent();
        // if (parent.hasClass('nav-bg'))
        // parent.removeClass('nav-bg')
        // else
        // parent.addClass('nav-bg');
        // $('.nav-bg').addClass("background-color","rgba(255,255,255,.85)");
        // console.log(parent.hasClass('nav-bg'))
    })

})


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