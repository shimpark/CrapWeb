/**
 * Created by jtmoon
 * Date: 2020-12-17
 */
var cropperProfile;
var buttonElement = $('.cropper-area>.button-wrapper>a');
$('.btn-add-photo').click(function () {
    $('#profileImageFile').click();
})

$('#profileImageFile').on('change', function () {
    try {
        cropperDestroy();
    } catch (e) {
    }
    var files = !!this.files ? this.files : [];
    if (!files.length || !window.FileReader) return;
    if (/^image/.test(files[0].type)) {
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend = function () {
            var thumbnail = $('.thumbnail');
            thumbnail.css('background-image', 'none');
            $('.cropper-area').show();
            $('#cropperImage').attr('src', this.result);
            var option = {
                aspectRatio: 1 / 1,
                preview: '.thumbnail',
                dragMode: 'move'
            }
            cropperProfile = new Cropper(document.getElementById('cropperImage'), option);
            initCropperFunction(buttonElement, cropperProfile, function () {
                //파일서버에 저장할 썸네일 사이즈
                var canvas = cropperProfile.getCroppedCanvas({
                    width: 150,
                    height: 150,
                    imageSmoothingEnabled: true,
                    imageSmoothingQuality: 'high'
                });

                var dataURL = canvas.toDataURL();
                var file = dataURLtoBlob(dataURL);
                var formData = new FormData($('#profileImageForm')[0]);
                formData.append('profileImage', file, 'profile.png');
                $.ajax({
                    url: '/Home/Upload',
                    type: 'POST',
                    data: formData,
                    enctype: 'multipart/form-data',
                    contentType: false,
                    processData: false,
                    success: function () {
                        cropperDestroy();
                        $('.thumbnail').css('background-image', 'url(' + dataURL + ')');
                    }
                });
            });
        };
    } else {
        alert('이미지 파일만 등록 가능합니다');
        $('.thumbnail').attr('src', '/content/images/icon/icon_photo.png');
        $(this).val(null);
        return false;
    }
});

function cropperDestroy() {
    //툴 버튼 클릭이벤트 삭제
    $('.cropper-area>.button-wrapper>a').each(function (index, element) {
        $(element).off('click');
    });
    //크랩객체 해제
    cropperProfile.destroy();

    $('.thumbnail>img').remove();
    //크랩영역 감추기
    $('.cropper-area').hide();
    //크랩이미지 지우기
    $('#cropperImage').attr('src', '');
}