/**
 * Created by jtmoon
 * Date: 2020-12-06
 */
// 게시글 파일업로드 확장자 제한
var UPLOAD_FILE_EXTENSION = '.zip, .xlsx, .xls, .doc, .docx, .hwp, .pptx, .pdf, .jpg, .jpeg, .png, .gif';

function callWriter(employeeObject) {
    var name = '', team = '';
    name = employeeObject.name;
    if (employeeObject.employeeTypeCode === 'ET01' || employeeObject.employeeTypeCode === 'ET02') {
        name += '(M)';
    }

    if (employeeObject.employeeTypeCode === 'ET02' || employeeObject.employeeTypeCode === 'ET03') {
        team = '#' + employeeObject.teamCodeName;
    }

    return {
        name: name,
        team: team,
        company: '#' + employeeObject.companyCodeName
    };
}

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
}

function initCropperFunction(elem, cropper, saveFunction) {
    elem.each(function (index, element) {
        var functionType = $(element).data('functionType');
        var cropperFunction;
        switch (functionType) {
            case 'zoomIn':
                cropperFunction = function () {
                    cropper.zoom(0.1)
                }
                break;
            case 'zoomOut':
                cropperFunction = function () {
                    cropper.zoom(-0.1)
                }
                break;
            case 'left':
                cropperFunction = function () {
                    cropper.move(-10, 0)
                }
                break;
            case 'right':
                cropperFunction = function () {
                    cropper.move(10, 0)
                }
                break;
            case 'up':
                cropperFunction = function () {
                    cropper.move(0, -10)
                }
                break;
            case 'down':
                cropperFunction = function () {
                    cropper.move(0, 10)
                }
                break;
            case 'rotateLeft':
                cropperFunction = function () {
                    cropper.rotate(-45);
                }
                break;
            case 'rotateRight':
                cropperFunction = function () {
                    cropper.rotate(45);
                }
                break;
            case 'refresh':
                cropperFunction = function () {
                    cropper.reset();
                }
                break;
            case 'save':
                cropperFunction = saveFunction;
                break;
            default:
                break;
        }
        $(element).on('click', cropperFunction);
    });
}

$(document).ajaxError(function (event, request, settings) {
    if (!Util.isEmptyObj(request.responseJSON) && !Util.isEmptyStr(request.responseJSON.message)) {
        alert(request.responseJSON.message);
    }
});