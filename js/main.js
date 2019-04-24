'use strict';

function atozStuff(azz, atozId, pullId) {
    azz.find('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function (event) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function () {
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) {
                        return false;
                    } else {
                        $target.attr('tabindex', '-1').focus();
                    };
                });
            }
        }
    });
    var pull = $(pullId);
    var menu = $(atozId);
    var menuHeight = menu.height();
    $(pull).on('click', function (e) {
        e.preventDefault();
        menu.slideToggle();
    });
    $(window).resize(function () {
        var w = $(window).width();
        if (w > 320 && menu.is(':hidden')) {
            menu.removeAttr('style');
        }
    });
}

function screenScrolling() {
    if ($(document).height() > screen.height * 4) {
        $('body').append('<button id="scrollTop" class="material-scrolltop" type="button"><span class="material-icons">&#xE316;</span></button>').addClass().materialScrollTop();
    }
}

function imgSizing(i) {
    i.each(function () {
        var $this = $(this);
        if ($this.is(':hidden')) {
            $this.addClass('allowWidthGrab');
        }
        var nowW = $this.get(0).width;
        var wasW = $this.get(0).naturalWidth;
        $this.attr('data-w', wasW).removeClass('allowWidthGrab');
        if (nowW < wasW) {
            $this.addClass('open-win').on('click', function () {
                window.open($this.attr('src'));
            });
        }
    });
}

function imgSizing2(i) {
    i.each(function () {
        var $this = $(this);
        $this.removeClass('open-win').off('click');
        var myWasW = $this.attr('data-w');
        var myNowW = Math.floor($this.width());
        if (myNowW < myWasW) {
            $this.addClass('open-win').on('click', function () {
                window.open($(this).attr('src'));
            });
        }
    });
}

function treatmentTbl(tt) {
    var state, state2, txt;
    tt.find('.panel-heading').each(function () {
        $(this).find('a').click(function (e) {
            e.preventDefault();
            var pan = $(this).closest('.panel');
            $(this).attr('aria-expanded', function (i, attr) {
                state = attr == 'true' ? 'false' : 'true';
                return state;
            });
            pan.toggleClass('show-content').find('.msg').text(function (i, txt) {
                return txt == jQuery.i18n.prop('VIEW ALL') ? jQuery.i18n.prop('HIDE ALL') : jQuery.i18n.prop('VIEW ALL');
            });
            pan.find('.panel-title').children('a').removeClass('show-panel').attr('aria-expanded', state);
            pan.find('.panel-content').removeAttr('style').attr('aria-expanded', state);
        });
    });
    tt.find('.panel-title').each(function () {
        $(this).find('a').click(function (e) {
            e.preventDefault();
            $(this).toggleClass('show-panel').attr('aria-expanded', function (i, attr) {
                state2 = attr == 'true' ? 'false' : 'true';
                return state2;
            }).closest('.panel-header').next('.panel-content').slideToggle().attr('aria-expanded', state2);
        });
    });
}

function detailsAccordion(tmp) {
    var sections = tmp.find('.container').children();
    sections.each(function () {
        var $this = $(this);
        if ($this.hasClass('rowHead')) {
            var a = $this.find('a');
            a.click(function (e) {
                e.preventDefault();
                a.attr('aria-expanded', function (i, attr) {
                    return attr == 'true' ? 'false' : 'true';
                }).find('.msg').text(function (i, txt) {
                    return txt == jQuery.i18n.prop('VIEW ALL') ? jQuery.i18n.prop('HIDE ALL') : jQuery.i18n.prop('VIEW ALL');
                });
                var cont = $this.parent('.container');
                var rowDet = cont.find('.rowDetails');
                var rowCon = cont.find('.rowCondition');
                var h3a = rowCon.find('a');
                cont.toggleClass('show-content');
                rowDet.removeAttr('style');
                rowCon.removeClass('openslide');
                h3a.add(rowDet).attr('aria-expanded', function (i, attr) {
                    return attr == 'true' ? 'false' : 'true';
                });;
            });
        } else {
            var t = $this.find('.rowCondition');
            var a = t.find('a');
            var rD = t.next('.rowDetails');
            a.add(rD).attr('aria-expanded', 'false');
            a.click(function (e) {
                e.preventDefault();
                t.toggleClass('openslide');
                rD.slideToggle();
                a.add(rD).attr('aria-expanded', function (i, attr) {
                    return attr == 'true' ? 'false' : 'true';
                });
            });
        }
    });
}

function FeedbackFormBespoke() {
    $('#feedBackBtn').find('a').click(function (e) {
        e.preventDefault();
        var fbe = $('#feedbackEmail').val();
        $('#feedbackContainer').find('.form-control').add('#feedbackContent').val('');
        if (fbe != '') {
            $('#feedbackEmail').parent().addClass('has-value');
            $('#feedbackEmail').val(fbe);
        }
        $('#feedbackContainer').modal();
        $('#feedbackContent').on('click focus', function () {
            $(this).parent().addClass('is-focused');
        }).on('blur', function () {
            if (($.trim($('#feedbackContent').val()) === "")) {
                $(this).parent().removeClass('is-focused');
            }
        });
    });
}

function landingPgAccords(t) {
    var mainDiv = t;
    var active1 = true;
    var cons = $('#consWrap');
    var consHeader = cons.find('.card-header');
    var consInverse = cons.find('.card-inverse');
    $('#collapse-auth').click(function (e) {
        e.preventDefault();
        if (active1) {
            active1 = false;
            mainDiv.find('div[id^=collapseAuthor]').collapse('show');
            consHeader.attr('data-toggle', '');
            consInverse.find('a').html($.i18n.prop('topic.section.hide.all') + '<span class="material-icons">&#xE5CE;</span>');
        } else {
            active1 = true;
            mainDiv.find('div[id^=collapseAuthor]').collapse('hide');
            consHeader.attr('data-toggle', 'collapse');
            consInverse.find('a').html($.i18n.prop('topic.section.view.all'));
        }
    });
    var active2 = true;
    var revs = $('#revsWrap');
    var revsHeader = revs.find('.card-header');
    var revsInverse = revs.find('.card-inverse');
    $('#collapse-rev').click(function (e) {
        e.preventDefault();
        if (active2) {
            active2 = false;
            mainDiv.find('div[id^=collapseReviewer]').collapse('show');
            revsHeader.attr('data-toggle', '');
            revsInverse.find('a').html($.i18n.prop('topic.section.hide.all') + '<span class="material-icons">&#xE5CE;</span>');
        } else {
            active2 = true;
            mainDiv.find('div[id^=collapseReviewer]').collapse('hide');
            revsHeader.attr('data-toggle', 'collapse');
            revsInverse.find('a').html($.i18n.prop('topic.section.view.all'));
        }
    });
    $('#diagFactors, #riskFactors, #initialTests, #subTests, #emergingTests, #commomEvalDiffs, #uncommomEvalDiffs, #otherFactors, #detailsGeneric').each(function () {
        $(this).find('li:gt(3)').addClass('hide2');
    });
}

function navBar() {
    var gNav = $('#globalNav-ul');
    var navDrop = gNav.find('.dropdown');
    if ($(window).width() <= 991) {
        if (!$('body').hasClass('home')) {
            gNav.find('.main').removeAttr('hidden');
        }
        navDrop.on('show.bs.dropdown', function () {
            $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
        });
        navDrop.on('hide.bs.dropdown', function () {
            $(this).find('.dropdown-menu').first().stop(true, true).slideUp(300);
        });
    } else {
        navDrop.on('show.bs.dropdown', function () {
            $(this).find('.dropdown-menu').first().stop(true, true).fadeIn(300);
        });
        navDrop.on('hide.bs.dropdown', function () {
            $(this).find('.dropdown-menu').first().stop(true, true).fadeOut(300);
        });
    }
}

function readMore(t) {
    t.find('.read-more__link').on('click', function () {
        $(this).hide();
    });
}

function imgVid(div) {
    div.gridderExpander({
        scroll: true,
        scrollOffset: 30,
        scrollTo: "panel",
        animationSpeed: 400,
        animationEasing: "easeInOutExpo",
        showNav: true,
        nextText: "<span></span>",
        prevText: "<span></span>",
        closeText: ""
    });
}

function expandableDivs(eD) {
    eD.each(function () {
        var $this = $(this);
        var myChildren = $this.children();
        if ((myChildren.length > 1) && (myChildren.first().is('p'))) {
            myChildren.not(':first').hide();
            myChildren.first().addClass('ellipsis').after('<span class="read-more__link">' + $.i18n.prop('topic.section.summary.read.more') + '</span>');
        } else if ((myChildren.length > 1) && (myChildren.first().not('p'))) {
            myChildren.not('*:first, *:nth-child(2)').hide()
            myChildren.first().next().addClass('ellipsis').after('<span class="read-more__link">' + $.i18n.prop('topic.section.summary.read.more') + '</span>');
        } else {
            myChildren.show().first().removeClass('ellipsis');
        }
        $this.find('.read-more__link').click(function () {
            $(this).addClass('d-none ').parent().find('.ellipsis').removeClass('ellipsis').end().children().fadeIn(700);
        });
    });
}

function disableTab(bs1) {
    if ($("#multimedia").length == 0) {
        bs1.find('.nav-item:eq(1)').find('a').addClass('disabled');
    }
}

function ourDates(d) {
    d.find('.allUpdates button, .updatesContent .close').click(function () {
        d.find('.collapse').collapse('hide');
    });
}
window.addEventListener("load", function () {
    var imgs = $('body').children('main').find('.figure');
    if (imgs.length) {
        var figImgs = imgs.find('img');
        imgSizing(figImgs);
        $(window).resize(function () {
            imgSizing2(figImgs);
        });
    }
    window.cookieconsent.initialise({
        "palette": {
            "popup": {
                "background": "#000"
            },
            "button": {
                "background": "#fff"
            }
        },
        "theme": "classic",
        "position": "bottom",
        "content": {
            "href": "https://www.bmj.com/company/your-privacy/cookies-policy/",
            "message": jQuery.i18n.prop('We use cookies to improve our service and to tailor our content and advertising to you. You can manage your cookie settings via your browser at any time. To learn more about how we use cookies, please see our cookies policy'),
            "link": jQuery.i18n.prop('https://www.bmj.com/company/your-privacy/cookies-policy/')
        }
    });
});
$(function () {
    jQuery.validator.addMethod("email", function (value, element) {
        return this.optional(element) || (/^[a-zA-Z0-9]+([-._+][a-zA-Z0-9]+)*@([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,4}$/.test(value) && /^(?=.{1,64}@.{4,64}$)(?=.{6,100}$).*/.test(value));
    }, validatorValidEmailAddressMessage);
    jQuery.validator.addMethod("pwCheck", function (value, element) {
        return this.optional(element) || (/^(?=.*\d)(?=.*[0-9]).{6,}$/.test(value));
    }, validatorValidPasswordMessage);
});
var validatorValidEmailAddressMessage = function () {
    return jQuery.i18n.prop('js.feedback.enter.valid.email');
}
var validatorValidPasswordMessage = function () {
    return jQuery.i18n.prop('js.login.validate.email');
}
var validatorEqualToPasswordMessage = function () {
    return jQuery.i18n.prop('js.login.validate.email.match');
}
var validatorRequiredFieldMessage = function () {
    return jQuery.i18n.prop('js.required.field');
}
jQuery.extend(jQuery.validator.messages, {
    equalTo: validatorEqualToPasswordMessage,
    required: validatorRequiredFieldMessage
});
$(document).ready(function () {
    topicNav();
    navBar();
    jQuery.extend({
        getValues: function (url) {
            var result = null;
            $.ajax({
                url: url,
                type: 'get',
                dataType: 'html',
                async: false,
                cache: false,
                success: function (data) {
                    result = data;
                }
            });
            return result;
        }
    });
    console.log("messagesCountryCode after = " + messagesCountryCode);
    if (document.location.href.indexOf('uk-ua') > -1) {
        messagesCountryCode = 'uk_UA';
    }
    if (document.location.href.indexOf('ru-ru') > -1) {
        messagesCountryCode = 'ru_RU';
    }
    if (document.location.href.indexOf('pt-br') > -1) {
        messagesCountryCode = 'pt_BR';
    }
    if (document.location.href.indexOf('es-es') > -1) {
        messagesCountryCode = 'es_ES';
    }
    if (document.location.href.indexOf('az-az') > -1) {
        messagesCountryCode = 'az_AZ';
    }
    if (document.location.href.indexOf('ka-ge') > -1) {
        messagesCountryCode = 'ka_GE';
    }
    if (document.location.href.indexOf('en-gb') > -1) {
        messagesCountryCode = 'en_GB';
    }
    if (document.location.href.indexOf('en-us') > -1) {
        messagesCountryCode = 'en_US';
    }
    if (document.location.href.indexOf('zh-cn') > -1) {
        messagesCountryCode = 'zh_CN';
    }
    if (document.location.href.indexOf('vi-vn') > -1) {
        messagesCountryCode = 'vi_VN';
    }
    jQuery.i18n.properties({
        name: 'messages',
        path: '/messages/',
        mode: 'map',
        language: messagesCountryCode,
        callback: function () {}
    });
    var tmp = $('#tmp').length > 0 ? $('#tmp') : $('#video-page');
    if (tmp.length) {
        if (tmp.hasClass('topic')) {
            landingPgAccords(tmp);
            readMore(tmp);
        }
        if (tmp.children().hasClass('details')) {
            detailsAccordion(tmp);
        }
        var eDivs = tmp.find('.expandable');
        if (eDivs.length) {
            expandableDivs(eDivs);
        }
        if (tmp.hasClass('treatment-table')) {
            treatmentTbl(tmp);
            createDrugPops(tmp);
        }
        tmp.find('p').each(function () {
            var $this = $(this);
            if ($this.html().replace(/\s|&nbsp;/g, '').length == 0) {
                $this.remove();
            }
        });
        if ($('#tmp.more-pops').length) {
            morePops(tmp);
        }
        createPops(tmp);
    }
    var myDates = $('#dates');
    if (myDates.length) {
        ourDates(myDates);
    }
    AutoComplete();
    var imgsV = $('#imgsVids');
    if (imgsV.length) {
        imgVid(imgsV);
    }
    if (navigator.appVersion.indexOf("MSIE 10") !== -1) {
        if ($('body').hasClass('home')) {
            $('body').children('.modal-registration-form, .login-form, .modal-registration-success').find('.fade').removeClass('fade');
        } else {
            $('#feedbackContainer').add('#feedbackSuccess').removeClass('fade');
        }
    }
    FormValidationMd.init();
    if ($('body').hasClass('home')) {
        RegistrationFn.init();
    } else if ($('#regFormPg').length) {
        RegistrationFn.init();
        RegistrationFormValidationMd.init();
    }
    if ($('#feedbackContainer').length) {
        FeedbackFormValidationMd.init();
        FeedbackFormBespoke();
    }
    searchJS();
    var bs = $('#bmj-serp');
    if (bs.length) {
        disableTab(bs);
    }
    var az = $('#a-z');
    if (az.length) {
        atozStuff(az, '#a-z', '#pull');
    }
    var emergencyAz = $('#emergency-a-z');
    if (emergencyAz.length) {
        atozStuff(emergencyAz, '#emergency-a-z', '#emergency-pull');
    }
    screenScrolling();
    importUpdatesSelectTabWhenAnchor();
    collapseImportantUpdatesIfNeeded();
    $('.specialty-list li:eq(-3)').after('<li><hr></li>');
});

function collapseImportantUpdatesIfNeeded() {
    var importantUpdatesButton = $('.allUpdates button');
    if (importantUpdatesButton.length) {
        var currentUrl = window.location.href.indexOf('#important-update');
        var referrer = document.referrer;
        if (referrer && (window.location.href.indexOf('#important-update') > -1 || referrer.indexOf("/recent-updates") > -1)) {
            $('#impUpdate').collapse('show');
        }
        if (referrer && (!window.location.href.indexOf('#important-update') > -1)) {
            $('#impUpdate').collapse('hide');
        }
    }
}
if ((document.location.href.indexOf('ru-ru') > -1) || (document.location.href.indexOf('uk-ua') > -1) || (document.location.href.indexOf('ka-ge') > -1)) {
    $('#menuLinks, #menus').addClass('ukru');
}
if ((document.location.href.indexOf('ru-ru') > -1) || (document.location.href.indexOf('uk-ua') > -1) || (document.location.href.indexOf('pt-br') > -1) && ($(window).width() > 1024)) {
    $('.txtwrap', '#tmp').css('padding-left', '65px');
    $('.btn-updates', '#tmp').css('font-size', '13px');
    $('#topicNav #menuLinks li').removeClass('vi-vn-tablet');
}
if ((document.location.href.indexOf('pt-br') > -1) && ($(window).width() > 1024)) {
    $('.btn-updates', '#tmp').css({
        'font-size': '12px',
        'padding': '8px'
    });
}
$(window).on("resize", function () {
    if ((document.location.href.indexOf('ru-ru') > -1) || (document.location.href.indexOf('uk-ua') > -1)) {
        if ($(window).width() < 1200) {
            $('#menuLinks, #menus').removeClass('ukru').addClass('ukruMenu');
        }
    }
}).resize();
if ((document.location.href.indexOf('az-az') > -1) || (document.location.href.indexOf('vi-vn') > -1)) {
    $('h1, h2, h3, h4, h5, h6').css('font-family', 'Arial');
}
if (document.location.href.indexOf('vi-vn') > -1) {
    $('#topicNav #menus').css('padding-bottom', '1rem');
    if ($(window).width() <= 1200) {
        $('#topicNav #menuLinks').removeClass('ukruMenu');
        $('#topicNav #menus').removeClass('ukru');
        $('#topicNav #menuLinks li').addClass('vi-vn-tablet');
        $('#topicNav #menus li').addClass('vi-vn-tablet');
    }
}
if (document.location.href.indexOf('vi-vn') > -1) {
    if ($(window).width() > 1200) {
        $('#topicNav #menuLinks li').addClass('vi-vn-desktop');
        $('#topicNav #menus li').addClass('vi-vn-desktop');
    }
}
if ($('.row.allUpdates .col-md-4:last-child').is(':empty')) {
    $('.row.allUpdates .col-md-4:last-child').css('display', 'none');
    $('.row.allUpdates .col-md-4:first-child, .row.allUpdates .col-md-4:nth-child(2)').removeClass("col-md-4").addClass("col-md-6");
}
if (document.location.href.indexOf('zh-cn') > -1) {
    $('#complicationsTable thead th:first-child').css('width', '80%');
}
$(window).on("resize", function () {
    if ($(window).width() <= 767) {
        $('#histEx').addClass('card').removeClass('card-group');
    } else {
        $('#histEx').addClass('card-group').removeClass('card');
    }
}).resize();

function importUpdatesSelectTabWhenAnchor() {
    var url = document.location.toString();
    if (url.match('recent-updates#npce')) {
        $('#nav-link-npce-changes').tab('show');
    }
    $('.nav-tabs a').on('shown.bs.tab', function (e) {
        window.location.hash = e.target.hash;
    })
};
$(function () {
    $('#tmp .accordion-toggle h3').prepend('<span class=\"material-icons\">&#xE5CF;</span>');
    $('.accordion-toggle').on('click', function () {
        var $icon = $(this).find('.material-icons');
        if ($icon.hasClass('open')) {
            $icon.html('&#xE5CF;');
        } else {
            $icon.html('&#xE5CE;');
        }
        $icon.toggleClass('open');
    });
    var active1 = true;
    var acc1 = $('#kdf');
    var rowHead = acc1.find('.rowHead');
    var rowCondition = acc1.find('.accordion-toggle');
    var rowDetails = acc1.find('div[id^=collapseFactor-]');
    acc1.find('h3[id^=kdf-]').click(function (e) {
        e.preventDefault();
        var $icon = rowHead.find('h3[id^=kdf-]').add(rowCondition).find('.material-icons');
        if ($icon.hasClass('open')) {
            $icon.html('&#xE5CF;');
        } else {
            $icon.html('&#xE5CE;');
        }
        $icon.toggleClass('open');
        rowHead.find('a').attr('aria-expanded', function (i, attr) {
            return attr == 'true' ? 'false' : 'true';
        }).find('.msg').text(function (i, txt) {
            return txt == jQuery.i18n.prop('VIEW ALL') ? jQuery.i18n.prop('HIDE ALL') : jQuery.i18n.prop('VIEW ALL');
        });
        if (active1) {
            active1 = false;
            rowCondition.attr('aria-expanded', 'true');
            rowDetails.addClass('show').attr('aria-expanded', 'true').slideDown('slow');
        } else {
            active1 = true;
            rowCondition.attr('aria-expanded', 'false');
            rowDetails.removeClass('show').attr('aria-expanded', 'false').slideUp('slow');
        }
    });
});
$(function () {
    var active2 = true;
    var acc2 = $('#odf');
    var rowHead = acc2.find('.rowHead');
    var rowCondition = acc2.find('.accordion-toggle');
    var rowDetails = acc2.find('div[id^=collapseFactor-]');
    acc2.find('h3[id^=odf-]').click(function (e) {
        e.preventDefault();
        var $icon = rowHead.find('h3[id^=odf-]').add(rowCondition).find('.material-icons');
        if ($icon.hasClass('open')) {
            $icon.html('&#xE5CF;');
        } else {
            $icon.html('&#xE5CE;');
        }
        $icon.toggleClass('open');
        rowHead.find('a').attr('aria-expanded', function (i, attr) {
            return attr == 'true' ? 'false' : 'true';
        }).find('.msg').text(function (i, txt) {
            return txt == jQuery.i18n.prop('VIEW ALL') ? jQuery.i18n.prop('HIDE ALL') : jQuery.i18n.prop('VIEW ALL');
        });
        if (active2) {
            active2 = false;
            rowCondition.attr('aria-expanded', 'true');
            rowDetails.addClass('show').attr('aria-expanded', 'true');
        } else {
            active2 = true;
            rowCondition.attr('aria-expanded', 'false');
            rowDetails.removeClass('show').attr('aria-expanded', 'false');
        }
    });
});
$(function () {
    var active3 = true;
    var acc3 = $('#rfs');
    var rowHead = acc3.find('.rowHead');
    var rowCondition = acc3.find('.accordion-toggle');
    var rowDetails = acc3.find('div[id^=collapseFactor-]');
    acc3.find('h3[id^=rfs-]').click(function (e) {
        e.preventDefault();
        var $icon = rowHead.find('h3[id^=rfs-]').add(rowCondition).find('.material-icons');
        if ($icon.hasClass('open')) {
            $icon.html('&#xE5CF;');
        } else {
            $icon.html('&#xE5CE;');
        }
        $icon.toggleClass('open');
        rowHead.find('a').attr('aria-expanded', function (i, attr) {
            return attr == 'true' ? 'false' : 'true';
        }).find('.msg').text(function (i, txt) {
            return txt == jQuery.i18n.prop('VIEW ALL') ? jQuery.i18n.prop('HIDE ALL') : jQuery.i18n.prop('VIEW ALL');
        });
        if (active3) {
            active3 = false;
            rowCondition.attr('aria-expanded', 'true');
            rowDetails.addClass('show').attr('aria-expanded', 'true');
        } else {
            active3 = true;
            rowCondition.attr('aria-expanded', 'false');
            rowDetails.removeClass('show').attr('aria-expanded', 'false');
        }
    });
});
$(function () {
    var active4 = true;
    var acc3 = $('#invest1');
    var rowTitle = acc3.find('h3');
    var rowCondition = acc3.find('.accordion-toggle');
    var rowDetails = acc3.find('div[id^=collapseTest-]');
    acc3.find('span.msg').click(function (e) {
        e.preventDefault();
        var $icon = rowTitle.find('.material-icons');
        if ($icon.hasClass('open')) {
            $icon.html('&#xE5CF;');
        } else {
            $icon.html('&#xE5CE;');
        }
        $icon.toggleClass('open');
        rowTitle.find('a').attr('aria-expanded', function (i, attr) {
            return attr == 'true' ? 'false' : 'true';
        }).find('.msg').text(function (i, txt) {
            return txt == jQuery.i18n.prop('VIEW ALL') ? jQuery.i18n.prop('HIDE ALL') : jQuery.i18n.prop('VIEW ALL');
        });
        if (active4) {
            active4 = false;
            rowCondition.attr('aria-expanded', 'true');
            rowDetails.addClass('show').attr('aria-expanded', 'true');
        } else {
            active4 = true;
            rowCondition.attr('aria-expanded', 'false');
            rowDetails.removeClass('show').attr('aria-expanded', 'false');
        }
    });
});
$(function () {
    var active4 = true;
    var acc3 = $('#invest2');
    var rowTitle = acc3.find('h3');
    var rowCondition = acc3.find('.accordion-toggle');
    var rowDetails = acc3.find('div[id^=collapseTest-]');
    acc3.find('span.msg').click(function (e) {
        e.preventDefault();
        var $icon = rowTitle.find('.material-icons');
        if ($icon.hasClass('open')) {
            $icon.html('&#xE5CF;');
        } else {
            $icon.html('&#xE5CE;');
        }
        $icon.toggleClass('open');
        rowTitle.find('a').attr('aria-expanded', function (i, attr) {
            return attr == 'true' ? 'false' : 'true';
        }).find('.msg').text(function (i, txt) {
            return txt == jQuery.i18n.prop('VIEW ALL') ? jQuery.i18n.prop('HIDE ALL') : jQuery.i18n.prop('VIEW ALL');
        });
        if (active4) {
            active4 = false;
            rowCondition.attr('aria-expanded', 'true');
            rowDetails.addClass('show').attr('aria-expanded', 'true');
        } else {
            active4 = true;
            rowCondition.attr('aria-expanded', 'false');
            rowDetails.removeClass('show').attr('aria-expanded', 'false');
        }
    });
});
$(function () {
    var active4 = true;
    var acc3 = $('#invest3');
    var rowTitle = acc3.find('h3');
    var rowCondition = acc3.find('.accordion-toggle');
    var rowDetails = acc3.find('div[id^=collapseTest-]');
    acc3.find('span.msg').click(function (e) {
        e.preventDefault();
        var $icon = rowTitle.find('.material-icons');
        if ($icon.hasClass('open')) {
            $icon.html('&#xE5CF;');
        } else {
            $icon.html('&#xE5CE;');
        }
        $icon.toggleClass('open');
        rowTitle.find('a').attr('aria-expanded', function (i, attr) {
            return attr == 'true' ? 'false' : 'true';
        }).find('.msg').text(function (i, txt) {
            return txt == jQuery.i18n.prop('VIEW ALL') ? jQuery.i18n.prop('HIDE ALL') : jQuery.i18n.prop('VIEW ALL');
        });
        if (active4) {
            active4 = false;
            rowCondition.attr('aria-expanded', 'true');
            rowDetails.addClass('show').attr('aria-expanded', 'true');
        } else {
            active4 = true;
            rowCondition.attr('aria-expanded', 'false');
            rowDetails.removeClass('show').attr('aria-expanded', 'false');
        }
    });
});
$(function () {
    var active4 = true;
    var acc3 = $('#tmp .complications');
    var rowTitle = acc3.find('h3');
    var rowCondition = acc3.find('.accordion-toggle');
    var rowDetails = acc3.find('tr[id^=collapseComp-]');
    acc3.find('span.msg').click(function (e) {
        e.preventDefault();
        var $icon = rowTitle.find('.material-icons');
        if ($icon.hasClass('open')) {
            $icon.html('&#xE5CF;');
        } else {
            $icon.html('&#xE5CE;');
        }
        $icon.toggleClass('open');
        rowTitle.find('a').attr('aria-expanded', function (i, attr) {
            return attr == 'true' ? 'false' : 'true';
        }).find('.msg').text(function (i, txt) {
            return txt == jQuery.i18n.prop('VIEW ALL') ? jQuery.i18n.prop('HIDE ALL') : jQuery.i18n.prop('VIEW ALL');
        });
        if (active4) {
            active4 = false;
            rowCondition.attr('aria-expanded', 'true');
            rowDetails.addClass('show').attr('aria-expanded', 'true');
        } else {
            active4 = true;
            rowCondition.attr('aria-expanded', 'false');
            rowDetails.removeClass('show').attr('aria-expanded', 'false');
        }
    });
});
$(function () {
    var arrow = $('<span class=\"material-icons\">&#xE5CF;</span>');
    var flag = $('#tmp #differ .accordion-toggle h3 span.icon-bp-icons-red-flag');
    var firstarrow = $('#tmp #differ .rowCondition h3 span:first-child');
    if (flag.length) {
        find('h3 span:first-child').remove();
        $(arrow).insertAfter(flag);
    }
});
$(function () {
    var active4 = true;
    var acc3 = $('#tmp #condition');
    var rowTitle = acc3.find('h3#diffCondition');
    var rowCondition = acc3.find('#condition .accordion-toggle');
    var rowDetails = acc3.find('div[id^=collapseDiff-]');
    acc3.find('h3#diffCondition').click(function (e) {
        e.preventDefault();
        var $icon = rowTitle.find('.material-icons');
        if ($icon.hasClass('open')) {
            $icon.html('&#xE5CF;');
        } else {
            $icon.html('&#xE5CE;');
        }
        $icon.toggleClass('open');
        rowTitle.find('a').attr('aria-expanded', function (i, attr) {
            return attr == 'true' ? 'false' : 'true';
        }).find('.msg').text(function (i, txt) {
            return txt == jQuery.i18n.prop('VIEW ALL') ? jQuery.i18n.prop('HIDE ALL') : jQuery.i18n.prop('VIEW ALL');
        });
        if (active4) {
            active4 = false;
            rowCondition.attr('aria-expanded', 'true');
            rowDetails.addClass('show').attr('aria-expanded', 'true');
        } else {
            active4 = true;
            rowCondition.attr('aria-expanded', 'false');
            rowDetails.removeClass('show').attr('aria-expanded', 'false');
        }
    });
});
$(function () {
    var active4 = true;
    var acc3 = $('#tmp #differ');
    var rowTitle = acc3.find('#diffCommonContainer h3');
    var rowCondition = acc3.find('#diffCommonContainer .accordion-toggle');
    var rowDetails = acc3.find('#diffCommonContainer div[id^=collapseDiff-]');
    acc3.find('h3#diffCommon').click(function (e) {
        e.preventDefault();
        var $icon = rowTitle.find('.material-icons');
        if ($icon.hasClass('open')) {
            $icon.html('&#xE5CF;');
        } else {
            $icon.html('&#xE5CE;');
        }
        $icon.toggleClass('open');
        rowTitle.find('a').attr('aria-expanded', function (i, attr) {
            return attr == 'true' ? 'false' : 'true';
        }).find('.msg').text(function (i, txt) {
            return txt == jQuery.i18n.prop('VIEW ALL') ? jQuery.i18n.prop('HIDE ALL') : jQuery.i18n.prop('VIEW ALL');
        });
        if (active4) {
            active4 = false;
            rowCondition.attr('aria-expanded', 'true');
            rowDetails.addClass('show').attr('aria-expanded', 'true');
        } else {
            active4 = true;
            rowCondition.attr('aria-expanded', 'false');
            rowDetails.removeClass('show').attr('aria-expanded', 'false');
        }
    });
    var rowCondition2 = acc3.find('#diffUnCommonContainer .accordion-toggle');
    var rowTitle2 = acc3.find('#diffUnCommonContainer h3');
    var rowDetails2 = acc3.find('#diffUnCommonContainer div[id^=collapseDiff-]');
    acc3.find('h3#diffUnCommon').click(function (e) {
        e.preventDefault();
        var $icon = rowTitle2.find('.material-icons');
        if ($icon.hasClass('open')) {
            $icon.html('&#xE5CF;');
        } else {
            $icon.html('&#xE5CE;');
        }
        $icon.toggleClass('open');
        rowTitle2.find('a').attr('aria-expanded', function (i, attr) {
            return attr == 'true' ? 'false' : 'true';
        }).find('.msg').text(function (i, txt) {
            return txt == jQuery.i18n.prop('VIEW ALL') ? jQuery.i18n.prop('HIDE ALL') : jQuery.i18n.prop('VIEW ALL');
        });
        if (active4) {
            active4 = false;
            rowCondition2.attr('aria-expanded', 'true');
            rowDetails2.addClass('show').attr('aria-expanded', 'true');
        } else {
            active4 = true;
            rowCondition2.attr('aria-expanded', 'false');
            rowDetails2.removeClass('show').attr('aria-expanded', 'false');
        }
    });
});
var markAsSeen = function (e) {
    $.post("/notifications/all/seen").fail(function () {
        console.log("Error marking notifications as seen");
    });
}
var markAsReadAndFollowLink = function (e) {
    const href = $(this).attr("href");
    $.post("/notifications/" + $(this).data("id") + "/read").done(function () {
        window.location.href = href;
    }).fail(function () {
        console.log("Error marking notifications as seen");
    });
    e.preventDefault();
}
var refreshNotifications = function () {
    $.post("/notifications/all/refresh").done(function () {
        $("#globalNav-account").load(location.href + " #globalNav-account>*", function () {
            $("#navbarDropdownMenuLink01").on("click", markAsSeen);
            $(".notification").on("click", markAsReadAndFollowLink);
        });
    }).fail(function () {
        console.log("Error refreshing notifications");
    });
}
$(document).ready(function () {
    if ($("#globalNav-account").length) {
        refreshNotifications();
    }
});
var existingEmailRemoteValidator = {
    url: '/registration/email-check',
    type: 'GET',
    data: {
        email: function () {
            return $('#rfInputEmail').val();
        }
    },
    dataFilter: function (data) {
        if (data == "true")
            return false;
        return true;
    },
    dataType: 'json',
    cache: false
};
var resolveValidationMessageForExistingEmail = function () {
    if (document.getElementById('ModalRegister')) {
        return jQuery.i18n.prop('js.registration.your.email.already.registered') + ' <a href="#modalLogin" class="text-uppercase" data-toggle="modal" data-dismiss="modal">' + jQuery.i18n.prop('js.registration.log.in.here') + '</a>.';
    } else {
        return jQuery.i18n.prop('js.registration.your.email.already.registered') + ' <a href="/login" class="text-uppercase">' + jQuery.i18n.prop('js.registration.log.in.here') + '</a>.';
    }
};
var RegistrationFormValidationMd = function () {
    var r = function () {
        var e = $("#regformModal"),
            r = $(".alert-danger", e),
            i = $(".alert-success", e);
        e.validate({
            errorElement: "div",
            errorClass: "form-control-feedback",
            focusInvalid: !1,
            ignore: "",
            rules: {
                "rfInputEmail": {
                    required: true,
                    email: !0,
                    remote: existingEmailRemoteValidator
                },
                "rfInputPassword1": {
                    required: true,
                    pwCheck: true
                },
                "rfInputPassword2": {
                    required: true,
                    equalTo: "#rfInputPassword1"
                },
                "termsOptIn": {
                    required: true
                }
            },
            messages: {
                "rfInputEmail": {
                    remote: resolveValidationMessageForExistingEmail()
                }
            },
            errorPlacement: function (e, r) {
                r.is(":checkbox") ? e.insertAfter(r.closest(".md-checkbox-list, .md-checkbox-inline, .checkbox-list, .checkbox-inline, .custom-checkbox")) : r.is(":radio") ? e.insertAfter(r.closest(".md-radio-list, .md-radio-inline, .radio-list,.radio-inline")) : e.insertAfter(r)
            },
            highlight: function (e) {
                $(e).closest(".form-group").addClass("has-danger").removeClass("password-hint");
            },
            unhighlight: function (e) {
                $(e).closest(".form-group").removeClass("has-danger").removeClass("password-hint");
            },
            onkeyup: function (e) {
                if ($(e).get(0).id === "rfInputPassword1" && $("#rfInputPassword1").val() != "") {
                    if (!$(e).valid()) {
                        $(e).closest(".form-group").addClass("password-hint").removeClass("has-danger");
                    }
                }
            },
            success: function (e) {
                e.closest(".form-group").removeClass("has-danger").removeClass("password-hint");
            },
            submitHandler: function (e) {
                i.show(), r.hide();
                performRegistration();
            }
        })
    };
    return {
        init: function () {
            r();
        }
    }
}();
var RegistrationFn = function () {
    var mr = function () {
        if ((localStorage.getItem("username") === null) && (localStorage.getItem('regmodal_hidden_forever') === null) && (sessionStorage.getItem('regmodal_dismissed') === null)) {
            var liVal = $('#loggedIn').val();
            if ("true" !== liVal) {
                window.setTimeout(function () {
                    $('#ModalRegister').modal('show');
                    RegistrationFormValidationMd.init();
                }, 3000)
            }
        }
        $('#ModalRegister').on('hidden.bs.modal', function (e) {
            sessionStorage.setItem('regmodal_dismissed', true);
            if ($('#hideRegistrationModalCheckbox').is(':checked')) {
                localStorage.setItem('regmodal_hidden_forever', true);
            }
        });
    };
    var msr = function () {
        $('#regformModal').find('input').val('');
        $('#ModalRegisterSuccess').on('hidden.bs.modal', function () {
            window.location = "/";
        });
    };
    return {
        init: function () {
            mr();
            msr();
        }
    };
}();
var performRegistration = function () {
    var data = {
        email: $("#rfInputEmail").val(),
        password: $("#rfInputPassword1").val(),
        repeatPassword: $("#rfInputPassword2").val(),
        isMarketingSelected: $("#marketingOptIn").is(":checked"),
        isTermsSelected: $("#termsOptIn").is(":checked")
    };
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: '/registration',
        data: JSON.stringify(data),
        dataType: 'json',
        cache: false
    }).done(function (data) {
        var code = data.code;
        console.log("code returned form registration: " + code);
        switch (code) {
            case 10:
                {
                    $('#ModalRegister').modal('hide');$('#ModalRegisterSuccess').modal('show');
                    break;
                }
            case 22:
                {
                    $('#ModalRegister').modal('hide');$('#ModalRegisterFail').modal('show');
                    break;
                }
            case 23:
                {
                    window.location = "/error";
                    break;
                }
            case 20:
                {
                    $('#ModalRegister').modal('hide');$('#ModalAccountCreationFailed').modal('show');
                    break;
                }
            case 24:
                {
                    window.location = "/error";
                    break;
                }
            default:
                {
                    window.location = "/error";
                }
        }
    }).fail(function () {
        window.location = "/error";
    });
};
jQuery.ajaxSetup({
    beforeSend: function () {
        $('#spinner').show().next().addClass('pl-4');
    },
    complete: function () {
        $('#spinner').hide().next().removeClass('pl-4');;
    },
    success: function () {},
    global: false
});
var FormValidationMd = function () {
    var r = function () {
        var e = $("#loginForm"),
            r = $(".alert-danger", e),
            i = $(".alert-success", e);
        e.validate({
            errorElement: "div",
            errorClass: "form-control-feedback",
            focusInvalid: !1,
            ignore: "",
            rules: {
                "lfInputEmail": {
                    required: true,
                    email: !0,
                },
                "lfInputPass": {
                    required: true
                }
            },
            errorPlacement: function (e, r) {
                r.is(":checkbox") ? e.insertAfter(r.closest(".md-checkbox-list, .md-checkbox-inline, .checkbox-list, .checkbox-inline")) : r.is(":radio") ? e.insertAfter(r.closest(".md-radio-list, .md-radio-inline, .radio-list,.radio-inline")) : e.insertAfter(r)
            },
            highlight: function (e) {
                $(e).closest(".form-group").addClass("has-danger")
            },
            unhighlight: function (e) {
                $(e).closest(".form-group").removeClass("has-danger")
            },
            success: function (e) {
                e.closest(".form-group").removeClass("has-danger")
            },
            submitHandler: function (e) {
                i.show(), r.hide();
                performLogin();
            }
        })
    };
    return {
        init: function () {
            r();
        }
    }
}();
var performLogin = function () {
    var data = {
        email: $("#lfInputEmail").val(),
        password: $("#lfInputPass").val(),
    };
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: '/login',
        data: JSON.stringify(data),
        dataType: 'json',
        cache: false
    }).done(function (data) {
        var code = data.code;
        console.log("code returned form login: " + code);
        switch (code) {
            case 10:
                {
                    $('#modalLogin').modal('hide');
                    if ($("#lfForwardUrl").length && $("#lfForwardUrl").val().trim() != '') {
                        window.location = $("#lfForwardUrl").val();
                        break;
                    }
                    window.location = "/";
                    break;
                }
            case 20:
                {
                    window.location = "/access-denied";
                }
            case 33:
                {
                    $('#loginFailed').show();
                    break;
                }
            case 31:
                {
                    $('#loginFailed').show();
                    break;
                }
            case 30:
                {
                    window.location = "/error";
                    break;
                }
            case 32:
                {
                    window.location = "/error";
                    break;
                }
            default:
                {
                    window.location = "/error";
                }
        }
    }).fail(function () {
        window.location = "/error";
    });
};

function closePops() {
    $(document).on('click', '.popover .close', function () {
        $('body').children('.popover').popover('hide');
    }).on('click', function (e) {
        $('body').children('main').find('[data-toggle="popover"]').each(function () {
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });
}

function createPops(p) {
    p.find('.referencePop').popover({
        html: true,
        container: 'body',
        title: 'Reference <a href="#" class="close" data-dismiss="alert">&times;</a>',
        constraints: [{
            to: 'window',
            pin: ['left', 'right']
        }],
        content: function () {
            var refId = $(this).html();
            var refContent = $(this).siblings(".citationText").html();
            var fullTextUrl = $(this).siblings(".citationFullTextUrl").html();
            var fullTextMarkup = '';
            if (fullTextUrl != undefined) {
                fullTextMarkup = '<p><a rel="external" class="web-link" target="_blank" href="' +
                    fullTextUrl + '">' + jQuery.i18n.prop('Full text') + ' <span class="icon icon-bp-icons-outbound-link"></span></a></p>';
            }
            var abstractUrl = $(this).siblings(".referenceUniqueId").html();
            var abstractUrlMarkup = '';
            if (abstractUrl != undefined) {
                abstractUrlMarkup = '<p><a rel="external" class="web-link" target="_blank" href="' +
                    abstractUrl + '">' + jQuery.i18n.prop('Abstract') + ' <span class="icon icon-bp-icons-outbound-link"></span></a></p>';
            }
            var openUrlId = $(this).siblings(".referenceOpenUrlId").html();
            var openUrlMarkup = '';
            if (openUrlId != undefined) {
                var openUrlLabel = $(this).siblings(".referenceOpenUrlLabel").html();
                var openUrlLogo = $(this).siblings(".referenceOpenUrlLogo").html();
                openUrlMarkup = '<p><a rel="external" class="web-link" target="_blank" href="' +
                    "/openurl/" + openUrlId.trim() + '">' + openUrlLabel + ' <span class="icon icon-bp-icons-outbound-link"></span></a></p>';
            }
            if (!$("#video-page").length) {
                return '<p><b>' + refId.replace("[", "").replace("]", "") + '.&nbsp;</b>' + refContent + '</p>' +
                    fullTextMarkup + abstractUrlMarkup + openUrlMarkup + '<p class="ref-link"><a href="/topics/' + langCode + '/' + topicId + '/references">' + jQuery.i18n.prop('VIEW ALL REFERENCES') + '</a></p>';
            } else {
                return '<p><b>' + refId.replace("[", "").replace("]", "") + '.&nbsp;</b>' + refContent + '</p>' + fullTextMarkup + abstractUrlMarkup;
            }
        }
    });
    p.find('.evidenceScorePop').on('click', function (e) {
        e.preventDefault();
    }).popover({
        html: true,
        container: 'body',
        title: 'Evidence Score <a href="#" class="close" data-dismiss="alert">&times;</a>',
        constraints: [{
            to: 'window',
            pin: ['left', 'right']
        }],
        content: function () {
            var esLevel = $(this).html();
            var esContent = $(this).siblings(".esContent").html();
            var esInfo = $(this).siblings(".esInfo").html();
            return '<p>' + esContent + '</p>' + '<div class="evidence-level"><h4>' + esLevel + '</h4><p>' + esInfo + '</p></div>';
        }
    });
    p.find('.cochranePop').on('click', function (e) {
        e.preventDefault();
    }).popover({
        html: true,
        container: 'body',
        title: '<img src="https://resources.bmj.com/repository/images/bp/cca-cochrane-logo-normal.png" data-element="cochrane-image-popup"></img><a href="#" class="close" data-dismiss="alert">&times;</a>',
        constraints: [{
            to: 'window',
            pin: ['left', 'right']
        }],
        content: function () {
            var refId = $(this).html();
            var ccaTitle = $(this).siblings(".ccaTitle").html();
            var ccaUrl = $(this).siblings(".ccaUrl").html();
            var ccaHrefText = $(this).siblings(".ccaHrefText").html();
            return '<p>' + ccaTitle + '</p>' + '<p class="ref-link"><a href="' + ccaUrl + '" target="_blank">' + ccaHrefText + '<span class="icon icon-bp-icons-outbound-link"></span></a></p>';
        }
    });
    closePops();
}

function createDrugPops(p) {
    p.find('a.drugDbPop').popover({
        html: true,
        container: 'body',
        title: 'Choose your drug database <a href="#" class="close" data-dismiss="alert">&times;</a>',
        constraints: [{
            to: 'window',
            pin: ['left', 'right']
        }],
        content: function () {
            var href = $(this).attr('href');
            var n = href.split('_');
            var conceptId = n[1];
            var langCode = n[2];
            var mapToDrugLink = function (drugDatabase) {
                var drugDbsForConceptId = drugMappings[conceptId];
                var drugId;
                if (drugDbsForConceptId != undefined) {
                    drugId = drugDbsForConceptId[drugDatabase];
                }
                if (drugId == undefined) {
                    drugId = '';
                }
                var drugDatabaseDisplayName = drugDatabase;
                if (drugDatabase === 'BNFC') {
                    drugDatabaseDisplayName = 'BNF FOR CHILDREN';
                }
                return '<li><a href="/druglink?dd=' + drugDatabase + '&ddId=' + encodeURIComponent(drugId) + '&langCode=' + langCode + '" target="_blank">' + drugDatabaseDisplayName + '&nbsp;<span class="icon icon-bp-icons-outbound-link"></span></a></li>';
            }
            return '<ul class="pop-list">' + drugDatabases.map(mapToDrugLink).join('') + '</ul><br/><p>' + jQuery.i18n.prop('topic.section.treatment-options.disclaimer') + '</p>';
        }
    });
    $(document).on("click", ".popover .close", function () {
        $(this).parents(".popover").popover('hide');
    });
}

function morePops(p) {
    var morep = p.find('a.morePop');
    morep.popover({
        html: true,
        container: 'body',
        constraints: [{
            to: 'window',
            pin: ['left', 'right']
        }],
        content: function () {
            var par = $(this).parent();
            var popTitle = par.find('.popTitle').text();
            var refContent = par.find('.popText').html();
            return '<div class="more-title">' + popTitle + ' <a href="#" class="close" data-dismiss="alert">&times;</a></div><div class="more-edit">' + refContent + '</div>';
        },
    });
    morep.each(function (index) {
        $(this).attr('href', '#referencePop-more' + index);
        $(this).parent('.reference').find('.reference').each(function () {
            var refP = $(this).find('.referencePop');
            $(this).find('.citationText').prepend(refP.text() + '&nbsp;');
            refP.remove();
            var refSpan = $(this).find('.citationFullTextUrl');
            if (refSpan.length) {
                refSpan.replaceWith('<a href="' + refSpan.text() + '" class="more-article" target="_blank">Full text <span class="material-icons material-icons-inline">&#xE89E;</span></a>');
            }
            var refSpan2 = $(this).find('.referenceUniqueId');
            if (refSpan2.length) {
                refSpan2.replaceWith('<span class="remove">|</span>&nbsp;<a href="' + refSpan2.text() + '" class="more-article" target="_blank">Abstract <span class="material-icons material-icons-inline">&#xE89E;</span></a>');
            }
        });
    });
}
var SearchFormValidation = function () {
    var r = function () {
        var e = $("#searchBoxForm");
        e.validate({
            ignore: "",
            rules: {
                q: "required"
            },
            errorPlacement: function (error, element) {},
            highlight: function (e) {
                $("#searchLabel").hide()
            },
            unhighlight: function (e) {
                $("#searchLabel").show()
            },
            submitHandler: function (form) {
                var q = $("#q");
                if (q.val().trim().length > 0) {
                    form.submit();
                }
            }
        })
    };
    return {
        init: function () {
            r()
        }
    }
}();
var esIds = [];
populateLanguageSwitchingIds();

function populateLanguageSwitchingIds() {
    $('#resultsList').find('.searchHitIds').each(function () {
        esIds.push(this.id);
    });
}

function searchJS() {
    var serp = $('#bmj-serp');
    if (serp.length) {
        var myInput = $('#searchBoxWrap').find('.tt-menu');
        $('#q').one('focus', function () {
            myInput.addClass('tt-label-override');
        }).keyup(function () {
            myInput.removeClass('tt-label-override');
        });
        serpPadding(serp);
        $(window).on('resize', function () {
            serpPadding(serp);
        });
    }
    var az = $('#a-z');
    if (az.length) {
        atoz(az);
        $(window).on('resize', function () {
            az.removeClass('mobile-view open fade-li').removeAttr('style').find('.reveal-li').removeClass('reveal-li');
            $('#a-zBtn').off('click').removeClass('arrow-up');
            atoz(az);
        });
    }
    SearchFormValidation.init();
    $("#searchShowMoreButton").click(function () {
        var searchTerm = $("#showMoreTerm").attr('value');
        var searchSize = parseInt($("#showMoreSize").attr('value'), 10);
        var searchFrom = parseInt($("#showMoreFrom").attr('value'), 10);
        if (searchFrom == 0) {
            searchFrom++;
        }
        searchFrom += searchSize;
        $.ajax({
            url: "/searchJson?q=" + searchTerm + "&from=" + searchFrom + "&size=" + searchSize,
            contentType: "application/json; charset=utf-8",
            cache: false
        }).done(function (data) {
            var html = "";
            $.each(data.hits, function (key, hit) {
                switch (hit.alias) {
                    case 'monograph':
                        addMonograph(hit)
                        break;
                    case 'patient-summary':
                        addPatientLeaflet(hit);
                        break;
                    case 'specialty':
                        addSpecialty(hit);
                        break;
                    case 'calculator':
                        addCalculator(hit);
                        break;
                    default:
                        addSection(hit);
                }
            });
            $("#showMoreFrom").attr('value', searchFrom);
            $("#searchTotalSummary").text((searchFrom - 1 + searchSize) + " of " + data.total + " results");
            populateLanguageSwitchingIds();
            if (data.total <= (searchFrom - 1 + searchSize))
                $("#searchShowMoreDiv").hide();
        }).fail(function () {
            alert("There has been an error");
        }).always(function () {});
    });
    $('#searchByLanguage').find('.searchByLanguage').click(function (event) {
        if (!event) event = window.event;
        var targetString = event.target.id;
        var langCode = targetString.substring(targetString.length - 5);
        var searchLang = $(".searchByLanguage").get(0).id;
        if (langCode.toLowerCase() == searchLang) {
            $("#searchShowMoreDiv").show();
        } else {
            $("#searchShowMoreDiv").hide();
        }
        jQuery.i18n.properties({
            name: 'messages',
            path: '/messages/',
            mode: 'map',
            language: capitaliseLangSuffix(langCode),
            callback: function () {}
        });
        console.log("/searchById?lang=" + langCode + "&esIds=" + esIds.join(","))
        $.ajax({
            url: "/searchById?lang=" + langCode + "&esIds=" + esIds.join(","),
            contentType: "application/json; charset=utf-8",
            cache: false
        }).done(function (data) {
            var html = "";
            $("#resultsList").empty();
            $.each(data.hits, function (key, hit) {
                switch (hit.typeName) {
                    case 'monograph':
                        addMonograph(hit)
                        break;
                    case 'patient_summary':
                        addPatientLeaflet(hit);
                        break;
                    case 'specialty':
                        addSpecialty(hit);
                        break;
                    case 'calculator':
                        addCalculator(hit);
                        break;
                    default:
                        addSection(hit);
                }
            });
            if (data.rightSideSearchResponse != null) {
                updateRightHandSide(data.rightSideSearchResponse);
            }
            if (data.size == 0) {
                $('#rhs-card').hide();
                $('#resultsList').hide();
                $('#noResults').show();
            } else {
                $('#rhs-card').show();
                $('#resultsList').show();
                $('#noResults').hide();
            }
            $('.searchByLanguage').removeClass("active");
            $('#' + langCode).addClass("active");
        }).fail(function () {
            alert("There has been an error");
        }).always(function () {});
    });
    var searchBF = $('#searchBoxWrap').find('.tt-menu');
    $('#q').on('keyup', function () {
        if ($(this).val().length >= 1) {
            searchBF.addClass('tt-suggested');
        } else {
            searchBF.removeClass('tt-suggested');
        }
        $("#searchLabel").hide();
    });
}

function capitaliseLangSuffix(langCode) {
    var parts = langCode.split('-');
    return parts[0] + '_' + parts[1].toUpperCase();
}

function addMonograph(hit) {
    var html = "<div class=\"card spc\">" + "<div class=\"card-block searchHitIds\" id=\"" + hit.source.id + "\">" + "<h4 class=\"card-title\" id=\"res_" + hit.source.monographType + "_" + hit.source.id + "\"><a href=\"/topics/" + hit.indexLanguage + "/" + hit.id + "\">" + hit.source.monographTitleBoost + "</a></h4>";
    switch (hit.source.monographType) {
        case 'condition':
            html = html + "<div class=\"srpLinks\">" +
                "<a href=\"/topics/" + hit.indexLanguage + "/" + hit.id + "\" class=\"card-link\">" + jQuery.i18n.prop('js.search.summary') + "</a>" +
                "<a href=\"/topics/" + hit.indexLanguage + "/" + hit.id + "/history-exam\" class=\"card-link\">" + jQuery.i18n.prop('js.search.history.and.exam') + "</a>" +
                "<a href=\"/topics/" + hit.indexLanguage + "/" + hit.id + "/investigations\" class=\"card-link\">" + jQuery.i18n.prop('js.search.investigations') + "</a>" +
                "<a href=\"/topics/" + hit.indexLanguage + "/" + hit.id + "/differentials\" class=\"card-link\">" + jQuery.i18n.prop('js.search.differential.diagnosis') + "</a>" +
                "<a href=\"/topics/" + hit.indexLanguage + "/" + hit.id + "/treatment-algorithm\" class=\"card-link\">" + jQuery.i18n.prop('js.search.treatment.algorithm') + "</a>" +
                "</div>";
            break;
        case 'overview':
            html = html + "<div class=\"srpLinks\">" +
                "<a href=\"/topics/" + hit.indexLanguage + "/" + hit.id + "\" class=\"card-link\">" + jQuery.i18n.prop('js.search.introduction') + "</a>" +
                "<a href=\"/topics/" + hit.indexLanguage + "/" + hit.id + "\" class=\"card-link\">" + jQuery.i18n.prop('js.search.conditions') + "</a>" +
                "</div>";
            break;
        case 'assessment':
            html = html + "<div class=\"srpLinks\">" +
                "<a href=\"/topics/" + hit.indexLanguage + "/" + hit.id + "\" class=\"card-link\">" + jQuery.i18n.prop('js.search.overview') + "</a>" +
                "<a href=\"/topics/" + hit.indexLanguage + "/" + hit.id + "/urgent-considerations\" class=\"card-link\">" + jQuery.i18n.prop('js.search.emergencies') + "</a>" +
                "<a href=\"/topics/" + hit.indexLanguage + "/" + hit.id + "/differentials\" class=\"card-link\">" + jQuery.i18n.prop('js.search.diagnosis') + "</a>" +
                "</div>";
            break;
        case 'generic':
            html = html + "<div class=\"srpLinks\">" +
                "<a href=\"/topics/" + hit.indexLanguage + "/" + hit.id + "\" class=\"card-link\">" + jQuery.i18n.prop('js.search.overview') + "</a>" +
                "<a href=\"/topics/" + hit.indexLanguage + "/" + hit.id + "/details\" class=\"card-link\">" + jQuery.i18n.prop('js.search.contents') + "</a>" +
                "</div>";
            break;
        default:
    }
    html += "</div></div>";
    $("#resultsList").append(html);
}

function addPatientLeaflet(hit) {
    var html = "<div class=\"card\">" + "<div class=\"card-block searchHitIds\" id=\"" + hit.source.id + "\">" + "<h4 class=\"card-title icon-leaflets\" th:id=\"'patLeaflet_'" + hit.source.patientSummaryTitle + "\">" + "<a href=\"" + hit.source.id + "\" >" + hit.source.patientSummaryTitle + " - " + jQuery.i18n.prop('js.search.patient.leaflet') + " </a></h4>" + "</div></div>";
    $("#resultsList").append(html);
}

function addSpecialty(hit) {
    var html = "<div class=\"card\">" + "<div class=\"card-block searchHitIds\" id=\"" + hit.source.id + "\">" + "<h4 class=\"card-title icon-specialties\"><a href=\"/specialties/" + hit.source.specialtyId + "\">" + hit.source.specialtyName + " </a></h4>" + "<div class=\"srpLinks\">" + "<a href=\"/specialties/" + hit.source.specialtyId + "\" class=\"card-link\">" + jQuery.i18n.prop('js.search.a.to.z') + " </a>" + "<a href=\"/specialties/" + hit.source.specialtyId + "\" class=\"card-link\">" + jQuery.i18n.prop('js.search.emergency') + " </a>" + "</div>" + "</div></div>";
    $("#resultsList").append(html);
}

function addSection(hit) {
    var html = "<div class=\"card\">" + "<div class=\"card-block searchHitIds\" id=\"" + hit.source.id + "\">" + "<h4 class=\"card-title\"><a href=\"/topics/" + hit.indexLanguage + "/" + hit.source.monographId + "/" + hit.alias + "\">" + hit.source.monographTitle + " - " + hit.alias + " </a></h4>" + "<p>" + hit.highlightContent + "</p>" + "</div></div>";
    $("#resultsList").append(html);
}

function addCalculator(hit) {
    var html = "<div class=\"card\">" + "<div class=\"card-block searchHitIds\" id=\"" + hit.source.id + "\">" + "<h4 class=\"card-title icon-calculators\"><a href=\"/calculators/" + hit.source.language + "/" + hit.source.fileName + "\">" + hit.source.title + " </a></h4>" + "<p>" + hit.source.description + "</p>" + "</div></div>";
    $("#resultsList").append(html);
}

function updateRightHandSide(rhs) {
    $("#rhsTitle").empty().append("<a class=\"card-title m-0\" href=\"/topics/" + rhs.topicLanguage + "/" + rhs.topicId + "\">" + rhs.topicTitle + "</a>");
    emptyRHS();
    $.each(rhs.sections, function (key, section) {
        console.log(section.name)
        switch (section.name) {
            case 'image':
                addRhsImage(rhs, section);
                break;
            case 'differential/diagnosis':
                addRhsDifferentialDiagnosis(rhs, section);
                break;
            case 'tests':
                addRhsTests(rhs, section);
                break;
            case 'treatment':
                addRhsTreatment(rhs, section);
                break;
            case 'summary/highlight':
                addRhsSummaryHighlight(rhs, section);
                break;
            case 'guidelines':
                addRhsGuidelines(rhs, section);
                break;
            case 'overview/introduction':
                addRhsOverviewIntroduction(rhs, section);
                break;
            case 'disease_subtypes':
                addRhsDiseaseSubtypes(rhs, section);
                break;
            case 'ccas':
                addRhsCcas(rhs, section);
                break;
            case 'generic/introduction':
                addRhsGenericIntroduction(rhs, section);
                break;
            case 'details':
                addRhsDetails(rhs, section);
                break;
            case 'patient_summary':
                addRhsPatientLeaflets(rhs, section);
                break;
            case 'procedural_videos':
                addRhsProceduralVideos(rhs, section);
                break;
            case 'calculators':
                addRhsCalculators(rhs, section);
                break;
            default:
        }
    });
    $("#rhsPdf").empty().append("<a href=\"/topics/" + rhs.topicLanguage + "/" + rhs.topicId + "/pdf/" + rhs.topicId + ".pdf\" target=\"_blank\"><span class=\"icon icon-bp-icons-pdf-extra-small-on-white\"></span>" + jQuery.i18n.prop('js.search.view.pdf') + "</a>");
}

function emptyRHS() {
    $("#rhsImage,#rhsDifferentialDiagnosis,#rhsTests,#rhsTreatment,#rhsGuidelines,#rhsPatientLeaflets,#rhsProceduralVideos,#rhsSummaryHighlight,#rhsOverviewIntroduction,#rhsDiseaseSubtypes,#rhsCcas,#rhsGenericIntroduction,#rhsDetails,#rhsCalculators").empty().hide();
}

function addRhsImage(rhs, section) {
    $("#rhsImage").append("<a href=\"#\" class=\"w-100\"><img class=\"card-img-bottom w-100\" src=\"/image/" + rhs.topicId + "/" +
        rhs.topicLanguage + "/normal/" + section.links[0].linkUrl + "\" alt=\"" + section.links[0].linkUrl + "\"></a>").show();
}

function addRhsDifferentialDiagnosis(rhs, section) {
    var html = "<div><h4><a href=\"/topics/" + rhs.topicLanguage + "/" + rhs.topicId + "/differentials\">" + jQuery.i18n.prop('js.search.differential.diagnosis') + "</a></h4>" + "<p class=\"card-text\">";
    if (section.content) {
        html += section.content;
    }
    html += "</p><ul class=\"serpBullet\">";
    html += addRhsSectionLinkAsList(rhs, section, 'differentials');
    html += "</ul>";
    html += createFullDetailsLink(rhs, 'differentials');
    html += "</div>"
    $("#rhsDifferentialDiagnosis").append(html).show();
}

function addRhsTests(rhs, section) {
    var html = "<div><h4><a href=\"/topics/" + rhs.topicLanguage + "/" + rhs.topicId + "/investigations\">" + jQuery.i18n.prop('js.search.tests.to.order') + "</a></h4>" + "<p class=\"card-text\">";
    if (section.content) {
        html += section.content;
    }
    html += "</p>";
    html += addRhsSectionLinkAsPara(rhs, section, 'investigations');
    html += createFullDetailsLink(rhs, 'investigations');
    html += "</div>";
    $("#rhsTests").append(html).show();
}

function addRhsTreatment(rhs, section) {
    var html = "<div><h4><a href=\"/topics/" + rhs.topicLanguage + "/" + rhs.topicId + "/treatment-algorithm\">" + jQuery.i18n.prop('js.search.management') + "</a></h4>" + "<p class=\"card-text\">";
    if (section.content) {
        html += section.content;
    }
    html += "</p><ul class=\"serpBullet\">";
    html += addRhsSectionLinkAsList(rhs, section, 'treatment-options');
    html += "</ul>";
    html += createFullDetailsLink(rhs, 'treatment-algorithm');
    html += "</div>"
    $("#rhsTreatment").append(html).show();
}

function addRhsGuidelines(rhs, section) {
    var html = "<div><h4><a href=\"/topics/" + rhs.topicLanguage + "/" + rhs.topicId + "/guidelines\">" + jQuery.i18n.prop('js.search.guidelines') + "</a></h4>" + "<p class=\"card-text\">";
    if (section.content) {
        html += section.content;
    }
    html += "</p>";
    html += addRhsSectionLinkAsPara(rhs, section, 'guidelines');
    html += createFullDetailsLink(rhs, 'guidelines');
    html += "</div>";
    $("#rhsGuidelines").append(html).show();
}

function addRhsPatientLeaflets(rhs, section) {
    var html = "<div><h4><a href=\"/topics/" + rhs.topicLanguage + "/" + rhs.topicId + "/patient-leaflets\">" + jQuery.i18n.prop('js.search.patient.leaflets') + "</a></h4>" + "<p class=\"card-text\">";
    if (section.content) {
        html += section.content;
    }
    html += "</p>";
    $.each(section.links, function (key, link) {
        html += "<p><a class=\"serpPL\" target=\"_blank\" href=\"/patient-leaflets/" + rhs.topicLanguage + "/pdf/" +
            link.linkUrl + ".pdf\"><span class=\"icon icon-bp-icons-patient-leaflets\"></span><span>" +
            link.linkTitle + "</span></a>";
        if (link.linkContent) {
            html += "<span>: " + link.linkContent + "</span>";
        }
        html += "</p>";
    });
    html += createFullDetailsLink(rhs, 'patient-leaflets');
    html += "</div>";
    $("#rhsPatientLeaflets").append(html).show();
}

function addRhsProceduralVideos(rhs, section) {
    var html = "<div><h4><a href=\"/procedural-videos\">" + jQuery.i18n.prop('js.search.procedural.videos') + "</a></h4>" + "<p class=\"card-text\">";
    if (section.content) {
        html += section.content;
    }
    html += "</p>";
    $.each(section.links, function (key, link) {
        html += "<p class=\"w-100\"><a class=\"serpPV\" href=\"/procedural-videos/" + rhs.topicLanguage + "/" +
            link.linkUrl + "\"><span class=\"icon icon-bp-icons-procedural-videos\"></span><span>" +
            link.linkTitle + "</span></a>";
        if (link.linkContent) {
            html += "<span>: " + link.linkContent + "</span>";
        }
        html += "</p>";
    });
    html += createFullDetailsLink(rhs, 'procedural-videos');
    html += "</div>";
    $("#rhsProceduralVideos").append(html).show();
}

function addRhsCalculators(rhs, section) {
    var html = "<div><h4><a href=\"/calculators\">" + jQuery.i18n.prop('js.search.calculators') + "</a></h4>" + "<p class=\"card-text\">";
    if (section.content) {
        html += section.content;
    }
    html += "</p>";
    $.each(section.links, function (key, link) {
        html += "<p class=\"w-100\"><a class=\"serpPV\" href=\"" + link.linkUrl + "\"><span class=\"icon icon-bp-icons-calculators\"></span><span>" +
            link.linkTitle + "</span></a>";
        if (link.linkContent) {
            html += "<span>: " + link.linkContent + "</span>";
        }
        html += "</p>";
    });
    html += createFullDetailsLink(rhs, 'calculators');
    html += "</div>";
    $("#rhsCalculators").append(html).show();
}

function addRhsSummaryHighlight(rhs, section) {
    var html = "<div><h4><a href=\"/topics/" + rhs.topicLanguage + "/" + rhs.topicId + "\">" + jQuery.i18n.prop('js.search.summary') + "</a></h4>" + "<p class=\"card-text\">";
    if (section.content) {
        html += section.content;
    }
    html += "</p>";
    html += addRhsSectionLinkAsParaNoLinkType(rhs, section);
    html += createFullDetailsLink(rhs, '');
    html += "</div>";
    $("#rhsSummaryHighlight").append(html).show();
}

function addRhsOverviewIntroduction(rhs, section) {
    var html = "<div><h4><a href=\"/topics/" + rhs.topicLanguage + "/" + rhs.topicId + "\">" + jQuery.i18n.prop('js.search.introduction') + "</a></h4>" + "<p class=\"card-text\">";
    if (section.content) {
        html += section.content;
    }
    html += "</p>";
    html += addRhsSectionLinkAsParaNoLinkType(rhs, section);
    html += createFullDetailsLink(rhs, '');
    html += "</div>";
    $("#rhsOverviewIntroduction").append(html).show();
}

function addRhsDiseaseSubtypes(rhs, section) {
    var html = "<div><h4><a href=\"/topics/" + rhs.topicLanguage + "/" + rhs.topicId + "\">" + jQuery.i18n.prop('js.search.conditions') + "</a></h4>" + "<p class=\"card-text\">";
    if (section.content) {
        html += section.content;
    }
    html += "</p><ul class=\"serpBullet\">";
    $.each(section.links, function (key, link) {
        html += "<li><a href=\"/topics/" + rhs.topicLanguage + "/" + rhs.topicId + "/" + link.linkUrl + "\">" + link.linkTitle + "</a>";
        if (link.linkContent) {
            html += "<span>: " + link.linkContent + "</span>";
        }
        html += "</li>";
    });
    html += "</ul>";
    html += createFullDetailsLink(rhs, '');
    html += "</div>"
    $("#rhsDiseaseSubtypes").append(html).show();
}

function addRhsGenericIntroduction(rhs, section) {
    var html = "<div><h4><a href=\"/topics/" + rhs.topicLanguage + "/" + rhs.topicId + "\">" + jQuery.i18n.prop('js.search.introduction') + "</a></h4>" + "<p class=\"card-text\">";
    if (section.content) {
        html += section.content;
    }
    html += "</p>";
    html += addRhsSectionLinkAsParaNoLinkType(rhs, section);
    html += createFullDetailsLink(rhs, '');
    html += "</div>";
    $("#rhsGenericIntroduction").append(html).show();
}

function addRhsDetails(rhs, section) {
    var html = "<div><h4><a href=\"/topics/" + rhs.topicLanguage + "/" + rhs.topicId + "/details\">" + jQuery.i18n.prop('js.search.details') + "</a></h4>" + "<p class=\"card-text\">";
    if (section.content) {
        html += section.content;
    }
    html += "</p><ul class=\"serpBullet\">";
    html += addRhsSectionLinkAsList(rhs, section, 'details');
    html += "</ul>";
    html += createFullDetailsLink(rhs, 'details');
    html += "</div>"
    $("#rhsDetails").append(html).show();
}

function addRhsSectionLinkAsList(rhs, section, linkType) {
    var html = "";
    $.each(section.links, function (key, link) {
        var localisedLinkTitle = link.linkTitle;
        switch (link.linkTitle) {
            case 'ongoing':
                localisedLinkTitle = jQuery.i18n.prop('serp.management.ongoing');
                break;
            case 'acute':
                localisedLinkTitle = jQuery.i18n.prop('serp.management.acute');
                break;
            case 'presumptive':
                localisedLinkTitle = jQuery.i18n.prop('serp.management.initial');
                break;
        }
        html += "<li><a href=\"/topics/" + rhs.topicLanguage + "/" + rhs.topicId + "/" + linkType + "#" + link.linkUrl + "\">" + localisedLinkTitle + "</a>";
        if (link.linkContent) {
            html += "<span>: " + link.linkContent + "</span>";
        }
        html += "</li>";
    });
    return html;
}

function addRhsSectionLinkAsPara(rhs, section, linkType) {
    var html = "";
    $.each(section.links, function (key, link) {
        html += "<p><a href=\"/topics/" + rhs.topicLanguage + "/" + rhs.topicId + "/" + linkType + "#" + link.linkUrl + "\">" + link.linkTitle + "</a>";
        if (link.linkContent) {
            html += "<span>: " + link.linkContent + "</span>";
        }
        html += "</p>";
    });
    return html;
}

function addRhsSectionLinkAsParaNoLinkType(rhs, section) {
    var html = "";
    $.each(section.links, function (key, link) {
        html += "<p><a href=\"/topics/" + rhs.topicLanguage + "/" + rhs.topicId + link.linkUrl + "\">" + link.linkTitle + "</a>";
        if (link.linkContent) {
            html += "<span>: " + link.linkContent + "</span>";
        }
        html += "</p>";
    });
    return html;
}

function addRhsCcas(rhs, section) {
    var html = "<div><h4><a href=\"/topics/" + rhs.topicLanguage + "/" + rhs.topicId + "/evidence\">" + jQuery.i18n.prop('js.search.evidence') + "</a></h4>" + "<p class=\"card-text\">";
    if (section.content) {
        html += section.content;
    }
    html += "</p>";
    $.each(section.links, function (key, link) {
        html += "<p class=\"w-100\"><a target=\"_blank\" href=\"" + link.linkUrl +
            "\"><span>" + link.linkTitle + " </span><span class=\"icon icon-bp-icons-outbound-link\"></span></a>";
        if (link.linkContent) {
            html += "<span>: " + link.linkContent + "</span>";
        }
        html += "</p>";
    });
    html += createFullDetailsLink(rhs, 'evidence');
    html += "</div>";
    $("#rhsSummaryHighlight").append(html);
}

function createFullDetailsLink(rhs, sectionPath) {
    return "<a href=\"/topics/" + rhs.topicLanguage + "/" + rhs.topicId + "/" + sectionPath + "\">" + jQuery.i18n.prop('topic.section.full.details') + "</a>";
}

function checkShowMoreDiv() {
    var searchSize = parseInt($("#showMoreSize").attr('value'), 10);
    var searchTotal = parseInt($("#showMoreTotal").attr('value'), 10);
    if (searchTotal > searchSize)
        $("#searchShowMoreDiv").hide();
}

function serpPadding(s) {
    if ($(window).width() < 768) {
        s.addClass('mobile-padding');
    } else {
        s.removeClass('mobile-padding');
    }
}

function atoz(nav) {
    if ($(window).width() < 768) {
        nav.addClass('mobile-view');
        var li = nav.children('li');
        var n = li.length - 1;
        var hiding = 0;
        var mw = Math.ceil(nav.innerWidth());
        var liw = parseInt(li.eq(0).outerWidth(true));
        var rows = parseInt(mw / liw) - 1;
        if (n > rows) {
            li.each(function (index) {
                if (index > rows - 1) {
                    $(this).addClass('reveal-li');
                    hiding = hiding + 1;
                }
            });
            var h = parseInt(nav.height());
            nav.css('height', h + 'px');
            hiding = hiding - 1;
            var showing = (n - hiding);
            var div = Math.ceil(hiding / showing) + 1;
            var btn = $('#a-zBtn');
            btn.click(function () {
                if (nav.hasClass('open')) {
                    nav.removeClass('fade-li').animate({
                        height: h
                    }, 400, function () {
                        $(this).removeClass('open');
                    });
                } else {
                    nav.addClass('open').animate({
                        height: h * div
                    }, 300, function () {
                        $(this).addClass('fade-li');
                    });
                }
                btn.toggleClass('arrow-up');
            });
        }
    }
}

function AutoComplete() {
    $("#q").typeahead({
        minLength: 0,
        highlight: true,
        hint: false
    }, {
        limit: 15,
        display: 'title',
        async: true,
        source: function (query, processSync, processAsync) {
            if (query.length < 1 && localStorage.getItem("topicsViewed") !== null) {
                return processSync(JSON.parse(localStorage.topicsViewed));
            } else if (query.length >= 2) {
                $.ajax({
                    url: "/completion?q=" + query + "&lang=" + searchDefaultLanguageCode + "&regionName=" + regionName +
                        "&availableLanguages=" + availableLanguages,
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        return processAsync(data);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        return '<div class="card"><a class="dropdown-item">' + errorThrown + '</a></div>'
                    }
                });
            } else {
                return processSync([]);
            }
        },
        templates: {
            suggestion: function (data) {
                return '<div class="card"><a href="/topics/' + data.lang + '/' + data.id + '?q=' + data.title + '&c=suggested" class="dropdown-item">' + data.title + '</a></div>';
            }
        }
    });
}
(function ($) {
    function mScrollTop(element, settings) {
        var _ = this,
            breakpoint;
        var scrollTo = 0;
        _.btnClass = '#scrollTop';
        _.revealClass = 'reveal';
        _.btnElement = $(_.btnClass);
        _.initial = {
            revealElement: 'body',
            revealPosition: 'top',
            padding: 0,
            duration: 600,
            easing: 'swing',
            onScrollEnd: false
        }
        _.options = $.extend({}, _.initial, settings);
        _.revealElement = $(_.options.revealElement);
        breakpoint = screen.height * 2.5;
        scrollTo = element.offsetTop + _.options.padding;
        $(document).scroll(function () {
            if (breakpoint < $(document).scrollTop()) {
                _.btnElement.addClass(_.revealClass);
            } else {
                _.btnElement.removeClass(_.revealClass);
            }
        });
        _.btnElement.click(function () {
            var trigger = true;
            $('html, body').animate({
                scrollTop: scrollTo
            }, _.options.duration, _.options.easing, function () {
                if (trigger) {
                    trigger = false;
                    var callback = _.options.onScrollEnd;
                    if (typeof callback === "function") {
                        callback();
                    }
                }
            });
            return false;
        });
    }
    $.fn.materialScrollTop = function () {
        var _ = this,
            opt = arguments[0],
            l = _.length,
            i = 0;
        if (typeof opt == 'object' || typeof opt == 'undefined') {
            _[i].materialScrollTop = new mScrollTop(_[i], opt);
        }
        return _;
    };
}(jQuery));
var FeedbackFormValidationMd = function () {
    var r = function () {
        var e = $("#feedbackForm"),
            r = $(".alert-danger", e),
            i = $(".alert-success", e);
        var title = document.getElementsByTagName("title")[0].innerHTML;
        $("#feedbackPageTitle").text($("#feedbackPageTitle").text() + title);
        $("#feedbackPage").val(title);
        e.validate({
            errorElement: "div",
            errorClass: "form-control-feedback",
            focusInvalid: !1,
            ignore: "",
            rules: {
                "feedbackEmail": {
                    required: true,
                    email: !0,
                },
                "feedbackName": {
                    required: true,
                },
                "feedbackContent": {
                    required: true
                }
            },
            highlight: function (e) {
                $(e).closest(".form-group").addClass("has-danger")
            },
            unhighlight: function (e) {
                $(e).closest(".form-group").removeClass("has-danger")
            },
            success: function (e) {
                e.closest(".form-group").removeClass("has-danger")
            },
            submitHandler: function (e) {
                i.show(), r.hide();
                performFeedbackRequest();
            }
        })
    };
    return {
        init: function () {
            r();
        }
    }
}();
var performFeedbackRequest = function () {
    var data = {
        name: $("#feedbackName").val(),
        email: $("#feedbackEmail").val(),
        page: $("#feedbackPage").val(),
        url: window.location.href,
        feedbackOn: $("input[name='feedbackOn']:checked").val(),
        feedback: $("#feedbackContent").val()
    };
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: '/feedback',
        data: JSON.stringify(data),
        dataType: 'json',
        cache: false
    }).done(function (data) {
        var code = data.code;
        console.log("code returned form feedback POST request: " + code);
        switch (code) {
            case 10:
                {
                    $('#feedbackContainer').modal('toggle').on("hidden.bs.modal", function () {
                        $('body').addClass('modal-open2');
                    }).find('.form-control').add('#feedbackContent').val('');$('#feedbackSuccess').modal('toggle').on("hidden.bs.modal", function () {
                        $('body').removeClass('modal-open2');
                    });
                    break;
                }
            default:
                {
                    window.location = "/error";
                }
        }
    }).fail(function () {
        window.location = "/error";
    });
    $(document).ajaxStart(function () {
        setTimeout(function () {
            $('#spinner2').addClass('progress-circular-spinner').show();
        }, 2500);
    }).ajaxStop(function () {
        $('#spinner2').removeClass('progress-circular-spinner').addClass('hide2');
    });
};;
(function (window, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return factory.apply(window);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory.call(window);
    } else {
        window.Waves = factory.call(window);
    }
})(typeof global === 'object' ? global : this, function () {
    'use strict';
    var Waves = Waves || {};
    var $$ = document.querySelectorAll.bind(document);
    var toString = Object.prototype.toString;
    var isTouchAvailable = 'ontouchstart' in window;

    function isWindow(obj) {
        return obj !== null && obj === obj.window;
    }

    function getWindow(elem) {
        return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
    }

    function isObject(value) {
        var type = typeof value;
        return type === 'function' || type === 'object' && !!value;
    }

    function isDOMNode(obj) {
        return isObject(obj) && obj.nodeType > 0;
    }

    function getWavesElements(nodes) {
        var stringRepr = toString.call(nodes);
        if (stringRepr === '[object String]') {
            return $$(nodes);
        } else if (isObject(nodes) && /^\[object (Array|HTMLCollection|NodeList|Object)\]$/.test(stringRepr) && nodes.hasOwnProperty('length')) {
            return nodes;
        } else if (isDOMNode(nodes)) {
            return [nodes];
        }
        return [];
    }

    function offset(elem) {
        var docElem, win, box = {
                top: 0,
                left: 0
            },
            doc = elem && elem.ownerDocument;
        docElem = doc.documentElement;
        if (typeof elem.getBoundingClientRect !== typeof undefined) {
            box = elem.getBoundingClientRect();
        }
        win = getWindow(doc);
        return {
            top: box.top + win.pageYOffset - docElem.clientTop,
            left: box.left + win.pageXOffset - docElem.clientLeft
        };
    }

    function convertStyle(styleObj) {
        var style = '';
        for (var prop in styleObj) {
            if (styleObj.hasOwnProperty(prop)) {
                style += (prop + ':' + styleObj[prop] + ';');
            }
        }
        return style;
    }
    var Effect = {
        duration: 750,
        delay: 200,
        show: function (e, element, velocity) {
            if (e.button === 2) {
                return false;
            }
            element = element || this;
            var ripple = document.createElement('div');
            ripple.className = 'waves-ripple waves-rippling';
            element.appendChild(ripple);
            var pos = offset(element);
            var relativeY = 0;
            var relativeX = 0;
            if ('touches' in e && e.touches.length) {
                relativeY = (e.touches[0].pageY - pos.top);
                relativeX = (e.touches[0].pageX - pos.left);
            } else {
                relativeY = (e.pageY - pos.top);
                relativeX = (e.pageX - pos.left);
            }
            relativeX = relativeX >= 0 ? relativeX : 0;
            relativeY = relativeY >= 0 ? relativeY : 0;
            var scale = 'scale(' + ((element.clientWidth / 100) * 3) + ')';
            var translate = 'translate(0,0)';
            if (velocity) {
                translate = 'translate(' + (velocity.x) + 'px, ' + (velocity.y) + 'px)';
            }
            ripple.setAttribute('data-hold', Date.now());
            ripple.setAttribute('data-x', relativeX);
            ripple.setAttribute('data-y', relativeY);
            ripple.setAttribute('data-scale', scale);
            ripple.setAttribute('data-translate', translate);
            var rippleStyle = {
                top: relativeY + 'px',
                left: relativeX + 'px'
            };
            ripple.classList.add('waves-notransition');
            ripple.setAttribute('style', convertStyle(rippleStyle));
            ripple.classList.remove('waves-notransition');
            rippleStyle['-webkit-transform'] = scale + ' ' + translate;
            rippleStyle['-moz-transform'] = scale + ' ' + translate;
            rippleStyle['-ms-transform'] = scale + ' ' + translate;
            rippleStyle['-o-transform'] = scale + ' ' + translate;
            rippleStyle.transform = scale + ' ' + translate;
            rippleStyle.opacity = '1';
            var duration = e.type === 'mousemove' ? 2500 : Effect.duration;
            rippleStyle['-webkit-transition-duration'] = duration + 'ms';
            rippleStyle['-moz-transition-duration'] = duration + 'ms';
            rippleStyle['-o-transition-duration'] = duration + 'ms';
            rippleStyle['transition-duration'] = duration + 'ms';
            ripple.setAttribute('style', convertStyle(rippleStyle));
        },
        hide: function (e, element) {
            element = element || this;
            var ripples = element.getElementsByClassName('waves-rippling');
            for (var i = 0, len = ripples.length; i < len; i++) {
                removeRipple(e, element, ripples[i]);
            }
            if (isTouchAvailable) {
                element.removeEventListener('touchend', Effect.hide);
                element.removeEventListener('touchcancel', Effect.hide);
            }
            element.removeEventListener('mouseup', Effect.hide);
            element.removeEventListener('mouseleave', Effect.hide);
        }
    };
    var TagWrapper = {
        input: function (element) {
            var parent = element.parentNode;
            if (parent.tagName.toLowerCase() === 'i' && parent.classList.contains('waves-effect')) {
                return;
            }
            var wrapper = document.createElement('i');
            wrapper.className = element.className + ' waves-input-wrapper';
            element.className = 'waves-button-input';
            parent.replaceChild(wrapper, element);
            wrapper.appendChild(element);
            var elementStyle = window.getComputedStyle(element, null);
            var color = elementStyle.color;
            var backgroundColor = elementStyle.backgroundColor;
            wrapper.setAttribute('style', 'color:' + color + ';background:' + backgroundColor);
            element.setAttribute('style', 'background-color:rgba(0,0,0,0);');
        },
        img: function (element) {
            var parent = element.parentNode;
            if (parent.tagName.toLowerCase() === 'i' && parent.classList.contains('waves-effect')) {
                return;
            }
            var wrapper = document.createElement('i');
            parent.replaceChild(wrapper, element);
            wrapper.appendChild(element);
        }
    };

    function removeRipple(e, el, ripple) {
        if (!ripple) {
            return;
        }
        ripple.classList.remove('waves-rippling');
        var relativeX = ripple.getAttribute('data-x');
        var relativeY = ripple.getAttribute('data-y');
        var scale = ripple.getAttribute('data-scale');
        var translate = ripple.getAttribute('data-translate');
        var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
        var delay = 350 - diff;
        if (delay < 0) {
            delay = 0;
        }
        if (e.type === 'mousemove') {
            delay = 150;
        }
        var duration = e.type === 'mousemove' ? 2500 : Effect.duration;
        setTimeout(function () {
            var style = {
                top: relativeY + 'px',
                left: relativeX + 'px',
                opacity: '0',
                '-webkit-transition-duration': duration + 'ms',
                '-moz-transition-duration': duration + 'ms',
                '-o-transition-duration': duration + 'ms',
                'transition-duration': duration + 'ms',
                '-webkit-transform': scale + ' ' + translate,
                '-moz-transform': scale + ' ' + translate,
                '-ms-transform': scale + ' ' + translate,
                '-o-transform': scale + ' ' + translate,
                'transform': scale + ' ' + translate
            };
            ripple.setAttribute('style', convertStyle(style));
            setTimeout(function () {
                try {
                    el.removeChild(ripple);
                } catch (e) {
                    return false;
                }
            }, duration);
        }, delay);
    }
    var TouchHandler = {
        touches: 0,
        allowEvent: function (e) {
            var allow = true;
            if (/^(mousedown|mousemove)$/.test(e.type) && TouchHandler.touches) {
                allow = false;
            }
            return allow;
        },
        registerEvent: function (e) {
            var eType = e.type;
            if (eType === 'touchstart') {
                TouchHandler.touches += 1;
            } else if (/^(touchend|touchcancel)$/.test(eType)) {
                setTimeout(function () {
                    if (TouchHandler.touches) {
                        TouchHandler.touches -= 1;
                    }
                }, 500);
            }
        }
    };

    function getWavesEffectElement(e) {
        if (TouchHandler.allowEvent(e) === false) {
            return null;
        }
        var element = null;
        var target = e.target || e.srcElement;
        while (target.parentElement) {
            if ((!(target instanceof SVGElement)) && target.classList.contains('waves-effect')) {
                element = target;
                break;
            }
            target = target.parentElement;
        }
        return element;
    }

    function showEffect(e) {
        var element = getWavesEffectElement(e);
        if (element !== null) {
            if (element.disabled || element.getAttribute('disabled') || element.classList.contains('disabled')) {
                return;
            }
            TouchHandler.registerEvent(e);
            if (e.type === 'touchstart' && Effect.delay) {
                var hidden = false;
                var timer = setTimeout(function () {
                    timer = null;
                    Effect.show(e, element);
                }, Effect.delay);
                var hideEffect = function (hideEvent) {
                    if (timer) {
                        clearTimeout(timer);
                        timer = null;
                        Effect.show(e, element);
                    }
                    if (!hidden) {
                        hidden = true;
                        Effect.hide(hideEvent, element);
                    }
                    removeListeners();
                };
                var touchMove = function (moveEvent) {
                    if (timer) {
                        clearTimeout(timer);
                        timer = null;
                    }
                    hideEffect(moveEvent);
                    removeListeners();
                };
                element.addEventListener('touchmove', touchMove, false);
                element.addEventListener('touchend', hideEffect, false);
                element.addEventListener('touchcancel', hideEffect, false);
                var removeListeners = function () {
                    element.removeEventListener('touchmove', touchMove);
                    element.removeEventListener('touchend', hideEffect);
                    element.removeEventListener('touchcancel', hideEffect);
                };
            } else {
                Effect.show(e, element);
                if (isTouchAvailable) {
                    element.addEventListener('touchend', Effect.hide, false);
                    element.addEventListener('touchcancel', Effect.hide, false);
                }
                element.addEventListener('mouseup', Effect.hide, false);
                element.addEventListener('mouseleave', Effect.hide, false);
            }
        }
    }
    Waves.init = function (options) {
        var body = document.body;
        options = options || {};
        if ('duration' in options) {
            Effect.duration = options.duration;
        }
        if ('delay' in options) {
            Effect.delay = options.delay;
        }
        if (isTouchAvailable) {
            body.addEventListener('touchstart', showEffect, false);
            body.addEventListener('touchcancel', TouchHandler.registerEvent, false);
            body.addEventListener('touchend', TouchHandler.registerEvent, false);
        }
        body.addEventListener('mousedown', showEffect, false);
    };
    Waves.attach = function (elements, classes) {
        elements = getWavesElements(elements);
        if (toString.call(classes) === '[object Array]') {
            classes = classes.join(' ');
        }
        classes = classes ? ' ' + classes : '';
        var element, tagName;
        for (var i = 0, len = elements.length; i < len; i++) {
            element = elements[i];
            tagName = element.tagName.toLowerCase();
            if (['input', 'img'].indexOf(tagName) !== -1) {
                TagWrapper[tagName](element);
                element = element.parentElement;
            }
            if (element.className.indexOf('waves-effect') === -1) {
                element.className += ' waves-effect' + classes;
            }
        }
    };
    Waves.ripple = function (elements, options) {
        elements = getWavesElements(elements);
        var elementsLen = elements.length;
        options = options || {};
        options.wait = options.wait || 0;
        options.position = options.position || null;
        if (elementsLen) {
            var element, pos, off, centre = {},
                i = 0;
            var mousedown = {
                type: 'mousedown',
                button: 1
            };
            var hideRipple = function (mouseup, element) {
                return function () {
                    Effect.hide(mouseup, element);
                };
            };
            for (; i < elementsLen; i++) {
                element = elements[i];
                pos = options.position || {
                    x: element.clientWidth / 2,
                    y: element.clientHeight / 2
                };
                off = offset(element);
                centre.x = off.left + pos.x;
                centre.y = off.top + pos.y;
                mousedown.pageX = centre.x;
                mousedown.pageY = centre.y;
                Effect.show(mousedown, element);
                if (options.wait >= 0 && options.wait !== null) {
                    var mouseup = {
                        type: 'mouseup',
                        button: 1
                    };
                    setTimeout(hideRipple(mouseup, element), options.wait);
                }
            }
        }
    };
    Waves.calm = function (elements) {
        elements = getWavesElements(elements);
        var mouseup = {
            type: 'mouseup',
            button: 1
        };
        for (var i = 0, len = elements.length; i < len; i++) {
            Effect.hide(mouseup, elements[i]);
        }
    };
    Waves.displayEffect = function (options) {
        console.error('Waves.displayEffect() has been deprecated and will be removed in future version. Please use Waves.init() to initialize Waves effect');
        Waves.init(options);
    };
    return Waves;
});

function searchItem() {
    var filter, p, a, i, h2;
    h2 = $('#atoz-list h2');
    filter = $('#myInput,#myInput2').val().toUpperCase();
    if (filter.length === 0) {
        h2.show();
    } else {
        h2.hide();
    }
    p = $('#atoz-list p');
    p.each(function (index) {
        a = $(this).children('a');
        if (a.html().toUpperCase().indexOf(filter) > -1) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

function deskTop(topicNav) {
    topicNav.removeClass('stickme up');
    var topicMenuTopWrap = $("#topicMenuTopWrap");
    var topicMenuBottomWrap = $('#topicMenuBottomWrap');
    var topicMenuTopBg = $('#topicMenuTopBg');
    var topicMenuTop = $('#topicMenuTop');
    var topicMenuBottom = $('#topicMenuBottom');
    var menuLinks = $('#menuLinks');
    topicMenuTopBg.add(topicMenuTopWrap).add(topicMenuTop).add(topicMenuBottomWrap).add(topicMenuBottom).removeAttr('style');
    topicMenuBottom.removeClass('activeMenu activeMenu2');
    menuLinks.find('a').off('click');
    var topicMenuTopH = topicMenuTopWrap.height();
    var topicMenuBottomH = topicMenuBottomWrap.height();
    topicMenuTopBg.add(topicMenuTopWrap).add(topicMenuTop).css('height', topicMenuTopH);
    topicMenuBottomWrap.add(topicMenuBottom).css('height', topicMenuBottomH);
    var newPos;
    var win = $(window);
    var move = function () {
        var st = win.scrollTop();
        var ot = topicMenuTopWrap.offset().top;
        if (st > ot) {
            topicNav.addClass('stickme');
        } else {
            topicNav.removeClass('stickme up');
            topicMenuBottom.removeClass('activeMenu activeMenu2');
        }
    };
    win.scroll(move);
    move();
    menuLinks.find('a').click(function (e) {
        e.preventDefault();
        if (topicNav.hasClass('stickme')) {
            topicNav.toggleClass('up');
            if (topicMenuBottom.hasClass('activeMenu')) {
                topicMenuBottom.removeClass('').animate({
                    top: -100
                }, function () {
                    topicMenuBottom.hide().removeClass('activeMenu activeMenu2').fadeIn(150);
                });
            } else {
                newPos = win.scrollTop() + topicMenuTopH - topicMenuBottomH;
                topicMenuBottom.fadeOut(100, function () {
                    topicMenuBottom.show().addClass('activeMenu').css('top', newPos).animate({
                        top: newPos + topicMenuBottomH
                    }, function () {
                        topicMenuBottom.addClass('activeMenu2').css('top', topicMenuTopH);
                    });
                });
            }
        }
    });
}

function nonDeskTop(topicNav) {
    var topicMenuBottom = $('#topicMenuBottom');
    var mobileMenu = $('#mobileMenu');
    var menusParent = $('#menus').find('.parent');
    topicMenuBottom.add($('#topicMenuTopWrap')).add($('#topicMenuTop')).add($('#topicMenuBottomWrap')).removeAttr('style');
    $(window).off('scroll');
    menusParent.off('click');
    mobileMenu.find('a').click(function (e) {
        e.preventDefault();
        if (topicMenuBottom.hasClass('mUp')) {
            topicMenuBottom.slideDown(300, function () {
                topicMenuBottom.add(mobileMenu).removeClass('mUp');
            });
        } else {
            topicMenuBottom.slideUp(300, function () {
                topicMenuBottom.add(mobileMenu).addClass('mUp');
            });
        }
    });
    menusParent.click(function () {
        var t = $(this);
        var menusUl = t.next('ul');
        if (t.hasClass('mUp')) {
            t.removeClass('mUp');
            menusUl.slideUp(300);
        } else {
            t.addClass('mUp');
            menusUl.slideDown(300);
        }
        return false;
    });
}

function anchorScroll() {
    var winhash = $(window.location.hash);
    if (winhash.length) {
        var plusP;
        var topicMenuTopHheight = $('#topicMenuTop').height();
        if ($('#tmp').hasClass('treatment-table')) {
            plusP = 10;
        } else {
            plusP = 24;
        }
        setTimeout(function () {
            var distance = winhash.offset().top - topicMenuTopHheight - plusP;
            $('html,body').animate({
                scrollTop: distance
            }, 300);
        }, 300);
    }
}

function topicFontResize() {
    var divheight = $("#topicMenuTop h1").height();
    var lineheight = parseInt($("#topicMenuTop h1").css('line-height'), 10);
    var noOfLines = Math.round(divheight / lineheight);
    if (noOfLines > 1) {
        $('#topicMenuTop h1').css('font-size', '1.3rem');
    }
}

function whichMenu(n) {
    if ($(window).width() > 975) {
        deskTop(n);
        topicFontResize();
    } else {
        nonDeskTop(n);
    }
}

function topicNav() {
    var tn = $('#topicNav');
    if (tn.length) {
        whichMenu(tn);
        anchorScroll();
        $(window).resize(function () {
            whichMenu(tn);
        });
    }
}


// Comorbidities 
// 1.stickie comorbidities card
$(function() {
    var cpluscard = $('#tmp').find('#como-1');
    var cplussticky = $('#tmp').find('#como-2');
    $(document).on('scroll', function() {
        if( $(this).scrollTop() >= $(cpluscard).position().top - 110 ){
            $(cplussticky).css('display', 'block');
        }
        else {
            $(cplussticky).css('display', 'none');
        }
    });
});

// 2. Launch select comorbidities modal on page load
$(function() {
    $('#editComo').modal('show');
});

// 3. Add checked comos to the 'Added Comorbidities' list
$(function() {
  
    // Enable/disable 'Show Treatment Algorithm' button
    var comorbidities = $('#tmp.treatment-table').find("input[name='comorbidity']");
    comorbidities.on('change', function () {
        $('#showalg').toggleClass("btn-secondary", comorbidities.is(":checked"));
    });

   

    // Add / remove selected values to / from the 'Add comorbidities' panel
    $("input[name='comorbidity']").change(function() {
    var value = $(this).val(),
        $list = $("#comoselected-1, #comoselected-2");
        var comochooser = $(this).attr('id');

    if (this.checked) {
        
        // Add to the comorbidities list
        $list.append("<span data-value='" + value + "'>" + value + "</span>  ");
        
        // Show the relevant content on the page
        $('#' + comochooser + '-como-content').css('display', 'block');
        
        // If section has the #-como-content, find the txtwrap class and add the c+ icon 
        $('section.panel-group').has('#' + comochooser + '-como-content').find('.txtwrap').removeClass('no-icon');
        
        // If comorbidities list has content, show the edit button
        $('#editComolist-1, #editComolist-2').show();
        
    }
    else {
        // Remove from the comorbidities list
        $list.find('span[data-value="' + value + '"]').fadeOut("fast", function() {
            $(this).remove();
        });
        
        // Hide the relevant content on the page
        $('#' + comochooser + '-como-content').css('display', 'none');
        
        // If section doesn't have the -como-content, find the txtwrap class and remove the c+ icon 
        $('section.panel-group').has('#' + comochooser + '-como-content').find('.txtwrap').addClass('no-icon');
        
        // If comorbidities list hasn't got any content, hide the edit button
        $('#editComolist-1, #editComolist-2').hide();
    }
  });
});

// Modal button behaviour
$(function() {
  var comorbidities = $("input[name='comorbidity']");
  comorbidities.on('change', function () {
    $('.showalg').toggleClass("btn-secondary", comorbidities.is(":checked"));
    $('button.showalg.ticked').toggleClass("show", comorbidities.is(":checked"));
    $('button.showalg.not-ticked').toggleClass("hide", comorbidities.is(":checked"));
    $(this).closest('li.list-group-item ').css({"border": "1px dashed #c50084", "background": "#f8e0f0"});

  });
  // Grab the topic title from the H1 tag and drop it into the modal para
  $('#editComo').find('p span').append($('#topicMenuTop h1').html());
});

// If the drop down contains a cor-mob content, show the icon in the title

$(function() {
    if ($('#poce_contents .panel-group').find('poce_drug_msg').lenghth !==0) {
        $(this).addClass('cor-mob-icon');
    };
});

// Drug hyperlink to toggle between cplus & no cplus info (changes content)
// (REFACTOR - prototype code)
$(function() {
    $('#como_link_1').click(function(event) {
        event.preventDefault();
        $(this).html('&#9664; Back to drug doses with added comorbidities');
        if ($('#no_cplus_drug_msg').is(':visible')){
            $(this).html('&#9654; Show drug doses for a patient with no comorbidities');
            $('#no_cplus_drug_msg').hide();
            $('#cplus_drug_msg').show();
            $('#drug_info_cplus').show();
            $('#drug_info_no_cplus').hide();
        } else {
            $(this).html('&#9664; Back to drug doses with added comorbidities');
            $('#no_cplus_drug_msg').show();
            $('#cplus_drug_msg').hide();
            $('#drug_info_cplus').hide();
            $('#drug_info_no_cplus').show();
        }
        return false;
    });
});


// POCE Evidence Accordion (nested)
var acc = document.getElementsByClassName("evidence-accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}