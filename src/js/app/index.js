/** 
@author:galan
@date:2017-10-18
*/

var PageSdK = function(window,document){
    function onTouchMove(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    //document.body.removeEventListener('touchmove',onTouchMove,false);
    //document.body.addEventListener('touchmove',onTouchMove,false);

    
    return {
        isIos: /iphone os/i.test(navigator.userAgent.toLowerCase()) || /ipad/i.test(navigator.userAgent.toLowerCase()),
        isAndroid: /android/i.test(navigator.userAgent.toLowerCase()),
        isPc:function(){
            if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
                //window.location.href=window.location.href.split('?mobile')[0];
                return false;
            }else{
                return true;
            }
        },
        isWx: function() {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true;
            } else {
                return false;
            }
        },
        isQq:function(){
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/QQ/i) == 'qq') {
                return true;
            } else {
                return false;
            }
        },
        onMsg:function(msg){
            if($("#cmTips").length){
                clearTimeout(_timer);
                $("#cmTips").remove();
            };
            var oHtml = [];
            oHtml.push('<section id="cmTips" class="cmTips">');
            oHtml.push('    <p class="msg-tx">'+msg+'</p>');
            oHtml.push('</section>');

            $("body").append(oHtml.join("")).find("#cmTips").addClass('show');
            _timer = setTimeout(function(){
                $("#cmTips").remove();
            },4000);
        },
        $ajax:function(type, url, oData, callback, ignore, async) {
            window._stop = true;
            var _this=this;
            if (!_stop && prevUrl == url) { //用于重复提交
                return false;
            }
            prevUrl = url;
            _stop = false;
            $.ajax({
                type: (type == '' ? 'POST' : type),
                url: url,
                dataType: 'json',
                data: oData,
                async: async || true,
                success: function (data) {
                    _stop = true;
                    callback && callback(data);

                }, error: function (argument) {
                    $('#loading').hide();
                    if (!ignore) {
                        _stop = true;
                        _this.onMsg("请求出错，请稍后再试");
                    }
                }
            });
        },
        getUrlString: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }, 
        init: function() {
            var _this=this;
            this.events();                                  
        },      
        events: function() {
            var _this = this;
            
            //this.$ajax('get', 'api/user', {page:1}, function(data){
                var games=[
                    {text:'Threads:2000'},
                    {text:'Posts: 350000'},
                    {text:'Members: 438900'},
                    {text:'Active Members: 25440'}
                ];

                var tpl = document.getElementById('tpl').innerHTML;
                //console.log(games.length)
                $(".nums1").html(template(tpl, {list:games} ));
            //})
        },
        noscroll:function(obj){
            function preventDefault(e) {
                e = e || window.event;
                e.preventDefault && e.preventDefault();
                e.returnValue = false;
            }

            function enableScroll(){
                $(document).off('mousewheel', preventDefault);
                $(document).off('touchmove', preventDefault);
                $(document.body).css({ "overflow-y": "auto", 'position': 'static', 'top': 'auto' });
            }

            $('.dlog_text .close').on('click',function(){            
                enableScroll()       
            });

            showScroll(obj)
            function showScroll(obj){
                $('body').addClass('noscroll');

                //针对弹窗内文本的滚动
                var _alertBodyObj;

                _alertBodyObj= $('.dlog_text .text');

                // 外部禁用
                $(document).on('touchmove', preventDefault);

                // 移动端touch重写
                var startX, startY;
                $(_alertBodyObj)[0].addEventListener('touchstart', function (e) {
                    startX = e.changedTouches[0].pageX;
                    startY = e.changedTouches[0].pageY;
                }, false);

                // 仿innerScroll方法
                $(_alertBodyObj)[0].addEventListener('touchmove', function (e) {
                    e.stopPropagation();
                    //$(document.body).css({ "overflow-y": "hidden", 'position': 'fixed', 'top': 0 });

                    var deltaX = e.changedTouches[0].pageX - startX;
                    var deltaY = e.changedTouches[0].pageY - startY;

                    // 只能纵向滚
                    if (Math.abs(deltaY) < Math.abs(deltaX)) {
                        e.preventDefault();
                        return false;
                    }

                    var box = $(this).get(0);
                    if ($(box).height() + box.scrollTop >= box.scrollHeight) {
                        if (deltaY < 0) {
                            e.preventDefault();
                            return false;
                        }
                    }
                    if (box.scrollTop === 0) {
                        if (deltaY > 0) {
                            e.preventDefault();
                            return false;
                        }
                    }
                }, false);
            }
        }
    };
}(window,document,undefined);

window.onload=function(){

    let arr = [2,4,5,6]
    setTimeout(() => {
        console.log(Array.isArray(arr))
    },500)

    const name = 'galan'
    console.log(`hello ${name}`) 

    const json = {
        user: 'galan',
        title: '测试'
    }
    const {user, title} = json;
    console.log(name, title)

    PageSdK.init();
    $.ajax({
        type: "get",
        url: "user",
        data: {},
        dataType: "json",
        success: function (data) {
            console.log(data)
        }
    });
};


