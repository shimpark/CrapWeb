/**
 * Created by jtmoon
 * Date: 2020-12-06
 */

var Util = function () {
};

Util.isNull = function (obj) {
    return obj === null || obj === undefined
}

Util.isEmptyStr = function (str) {
    return Util.isNull(str) || str === '';
}

Util.isEmptyObj = function (obj) {
    return Util.isNull(obj) || obj.length === 0;
}

Util.replaceNull = function (str, replaceText) {
    if (Util.isEmptyStr(str)) {
        str = Util.isEmptyStr(replaceText) ? '' : replaceText;
    }

    return str;
}

Util.showPopup = function (message, closeCallback) {
    $('html').addClass('open');
    $('.dim').show();
    var popup = 'alertPopup';
    $('#' + popup + ' #popupMessage').html(message);
    $('#' + popup).addClass('active');
    $('#' + popup).fadeIn(350, function () {
        $('#btnCloseAlertPopup').focus();
    });

    $('#btnCloseAlertPopup').one('click', function () {
        Util.closePopup(popup, closeCallback);
    });
}


Util.showConfirm = function (message, trueCallback, falseCallback) {
    $('html').addClass('open');
    $('.dim').show();
    var popup = 'confirmPopup';
    $('#' + popup + ' #confirmMessage').html(message);
    $('#' + popup).addClass('active');
    $('#' + popup).fadeIn(350);

    $('#btnTrue').one('click', function () {
        Util.closePopup(popup, trueCallback);
        $('#btnFalse').off('click');
    })

    $('#btnFalse').one('click', function () {
        Util.closePopup(popup, falseCallback);
        $('#btnTrue').off('click');
    })
}

Util.closePopup = function (popup, callback) {
    $('.dim').hide();
    $('html').removeClass('open');
    $('#' + popup).removeClass('active');
    $('#' + popup).fadeOut(350, function () {
        if (!Util.isNull(callback) && typeof callback === 'function') {
            callback();
        }
    });

}

Util.validateId = function (id) {
    if (Util.isEmptyStr(id)) {
        Util.showPopup('아이디를 입력해 주세요.');
        return false;
    }

    var regex = /^[A-Za-z0-9]{8,20}$/;
    if (!regex.test(id)) {
        Util.showPopup('아이디 형식이 맞지 않습니다.<br>(영문, 숫자, 8 ~ 20자)')
        return false;
    }

    return true;
}

Util.validatePw = function (pw) {
    var regex = /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    if (!regex.test(pw)) {
        alert('비밀번호 형식이 맞지 않습니다.(영문, 숫자, 특문 조합 8자 이상)')
        return false;
    }

    return true;
}


jQuery.fn.extend({
    serializeJSON: function () {
        var arrayData, objectData;
        arrayData = this.serializeArray();
        objectData = {};
        $.each(arrayData, function () {
            var value;
            if (this.value != null) {
                value = this.value;
            } else {
                value = '';
            }

            if (objectData[this.name] != null) {
                if (!objectData[this.name].push) {
                    objectData[this.name] = [objectData[this.name]];
                }
                objectData[this.name].push(value);
            } else {
                objectData[this.name] = value;
            }
        });
        return objectData;
    },

    customModal: function (action, display, callback) {
        if (action === 'show') {
            $('#dim').show();
            $('.modal-container').css('display', 'flex');
            $('body').addClass('modal');
            this.css('display', display);
        } else {
            $('#dim').hide();
            $('.modal-container').hide();
            $('body').removeClass('modal');
            this.hide();
        }

        if(!Util.isEmptyObj(callback) && typeof(callback) === 'function'){
            callback();
        }
    }
});
