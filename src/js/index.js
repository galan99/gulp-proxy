// 微信音频自动播放定义
function audioAutoPlay() {
    var audio = document.getElementById('au1'),
        play = function() {
            audio.play();
            document.removeEventListener("touchstart", play, false);
        };
    audio.play();
    document.addEventListener("touchstart", play, false);
}


$(document).ready(function() {
    $.ajax({
        url: '/user/login',//http://192.168.4.124:7200/user/login,http://192.168.143.51/helpAct/put
        type:'post',
        dataType: 'json',
        data: {
            username:'hale',
            password:'1234569',
            rememberMe:1,
            login_type:1,
        },
        success:function(data){
            console.log(data)
        },
        error:function(err){
            console.log('请求出错')
        },
    });

    $('#ticket').scrollTop($('#ticket').height());

    $('.init .btn2').on('click', function() {
        $.get('http://my.member.test.com/ActivityTmpMhhy/activity', function(res) {
            console.log(res)
        })
    })
    "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIfU8ZrLcic6Ije4v3K0Yd3E0HKdScQUGcMT9UbPsU5o4uRqMorJpl4EVhoyiaicogFR4KJ2q9FIwhbw/0"
    'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKMofMlgI15boXuK5qLic5R3ZHGJwEHibZ3IFKlodgxM8dBurUOktvkeydOuSueWCnN2C7V2bibEGAqg/0'

    'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKMofMlgI15boXuK5qLic5R3ZHGJwEHibZ3IFKlodgxM8dBurUOktvkeydOuSueWCnN2C7V2bibEGAqg/0'
    'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIfU8ZrLcic6Ije4v3K0Yd3E0HKdScQUGcMT9UbPsU5o4uRqMorJpl4EVhoyiaicogFR4KJ2q9FIwhbw/0'

    $('.btn .Invitation').on('click', () => {
        // $('.btn div').show();
        // $('.btn .Invitation').hide();
        $('#Popup1').show();
        $('#Popup1 .box7').show();
    })
    $('.btn div .calls').on('click', () => {
        $('.btn div').hide();
        $('.btn .Invitation').show();
    })

    if ($('#Popup1 .layer')) {
        document.documentElement.addEventListener('touchmove', fn, false);
    }
    $('#Popup1 .box1 .close').on('click', () => {
        $('#Popup1 .box1').hide();
    })
    $('#Popup1 .box2 .close').on('click', () => {
        $('#Popup1 .box2').hide();
    })
    $('#Popup1 .box3 .close').on('click', () => {
        $('#Popup1 .box3').hide();
    })
    $('#Popup1 .box4 .close').on('click', () => {
        $('#Popup1 .box4').hide();
    })
    $('#Popup1 .box5 .close').on('click', () => {
        $('#Popup1 .box5').hide();
    })
    $('#Popup1 .box6 .close').on('click', () => {
        $('#Popup1 .box6').hide();
    })
    $('#Popup1 .layer').on('click', () => {
        $('#Popup1').hide();
        document.documentElement.removeEventListener('touchmove', fn, false);
    })
    $('#guide').on('click', () => {
        $('#guide').hide();
    })

    function fn(e) {
        e.preventDefault();
    }

    // 判断是否是微信
    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }

    /* 音频控制 */
    if (isWeiXin()) {
        audioAutoPlay(); // 顶部有定义
    } else {
        $(".music").removeClass("muClose");
        isPlaying = false;
    }
    $(".music").on("click", function() {
        // $(this).addClass("muClose");
        if (!$(this).hasClass("muClose")) {
            // 处在暂停状态，点击播放
            $("#au1")[0].play();
            $(this).addClass("muClose");
            isPlaying = true;
        } else {
            // 点击暂停
            $("#au1")[0].pause();
            $(this).removeClass("muClose");
            isPlaying = false;
        }
    });
})