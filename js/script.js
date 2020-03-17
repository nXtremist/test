$(document).ready(function () {
    $('#toTop').hide().click(function () {
        $(this).fadeOut(350)
    });
    $('.truncate').succinct({
            size: 300
        });
    personalAttributeStyler();
    appendHeading();
    collapseNavOnClick();
    navBgTransition();
})
window.addEventListener('load', function () {
    $('.loader').fadeOut();
})
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



function appendHeading() {
    waitUntil(500, Infinity, function condition() {
        return (document.getElementsByClassName('instagram_gallery').length === 2 ? true : false);
    }, function done(result) {
        var temp = document.getElementsByClassName('instagram_gallery');
        console.log(temp)
        for (let index = 0; index < temp.length; index++) {
            const element = temp[index];
            element.insertAdjacentHTML('beforebegin', '<h1>Latest stuff from my Insta</h1>')
        }
    })
}

function personalAttributeStyler() {
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

function collapseNavOnClick() {
    $('.nav-link').click(function () {
        var $mainNav = $('#mainNav');
        $mainNav.removeClass('nav-bg');
        $mainNav.addClass('bg-none');
        $('#navToggle').prop('checked', false)
        $('.collapse').collapse('hide')
        $('#toTop').fadeIn();
    });
}

function navBgTransition() {
    $('#navToggle').click(function () {
        var isChecked = $(this).is(':checked');
        var $mainNav = $('#mainNav');
        var $collapsibleNavbar = $('#collapsibleNavbar')
        var $label_navbarToggler = $('label.navbar-toggler')
        if (isChecked) {
            $mainNav.removeClass('bg-none')
            $mainNav.addClass('nav-bg')
            $collapsibleNavbar.collapse('show')
            $label_navbarToggler.css('pointer-events', 'none')
            setTimeout(function () {
                $label_navbarToggler.css('pointer-events', 'initial')
            }, 450)

        } else {
            $mainNav.removeClass('nav-bg');
            $mainNav.addClass('bg-none');
            $collapsibleNavbar.collapse('hide')
            $label_navbarToggler.css('pointer-events', 'none')
            setTimeout(function () {
                $label_navbarToggler.css('pointer-events', 'initial')
            }, 450)

        }
    })
}