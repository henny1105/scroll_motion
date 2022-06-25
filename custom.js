 var $btns = $("#navi li"); 
 var $boxs = $(".myScroll"); 
 var len = $btns.length; 
 var posArr = []; 
 var speed = 1000; 
 var baseLine = 0; // 브라우저 화면에서 일정 수치만큼 떨어진 곳에서 박스에 클래스 on을 주기 위한 변수설정 

 //처음 로딩시 해당 박스의 세로 위치값을 구하는 함수 호출 
setPos(); //[0, 600,1300, 2000]; 

//브라우저 리사이즈시 다시 세로 위치값을 갱신 
$(window).on("resize", setPos );
 
//내비 버튼 클릭시 자동으로 해당 위치로 이동해 주는 함수 호출  
$btns.children("a").on("click", function(e){
    e.preventDefault(); 
    moveScroll(this);      
});
 
//브라우저 스크롤시 해당 스크롤값과 박스의 위치값을 비교해서 
//자동으로 버튼 활성화 해 주는 함수 호출 
$(window).on("scroll", function(){
    var scroll = $(this).scrollTop(); 
   console.log(scroll);    
   activateBtn(scroll);   
   
   $("#visual p").css({
       transform:"rotate("+ scroll / 4 +"deg) scale("+(1+ scroll / 1000) +")"
   });

   if(scroll >= posArr[1] && scroll < posArr[2]){
    //해당 스크롤값이 news에 도달한 순간 스크롤값에서 news의 세로값을 빼서 
    //다시 스크롤값을 0부터 시작하게 만들기 
    //스크롤이 #news에 해당될 때 

    scroll = scroll - posArr[1]; //posArr[1]은 visual 높이값
    console.log(scroll);  
    $("#news p").css({
        left:scroll,
        top:scroll
    });
   }
   


 });

 //박스 갯수만큼 반복을 돌면서 전역변수 posArr에 세로 위치값을 저장하는 함수 
 function setPos(){
    posArr=[]; 

    for(var i=0; i<len; i++){
        posArr.push($boxs.eq(i).offset().top); 
    }   
     console.log(posArr);
}

//현재 스크롤 위치값을 인수로 받아서 
//스크롤값과 박스의 위치를 비교해서 해당하는 버튼만 활성화 시키는 함수 
 function activateBtn(scroll){   
    for(var i=0; i<len; i++){
       
        //배열에 담긴 오프셋값에 baseline만큼 수치를 포함하여 계산
        if(scroll >= posArr[i] + baseLine){     
            $btns.children("a").removeClass("on");           
            $btns.eq(i).children("a").addClass("on"); 

           // $boxs.removeClass("on"); 
            $boxs.eq(i).addClass("on");
        }
    }  
 }

//선택한 요소의 아이디값을 받아서 해당 아이디값에 해당하는 박스를 찾고
//해당 박스의 세로 위치값으로 자동 이동시켜주는 함수 
function moveScroll(el){
    var target = $(el).attr("href"); //#header #news ..
    var targetPos = $(target).offset().top; 
 
     $("html, body").animate({
         scrollTop: targetPos
     },speed); 
}



 /*
.scrollTop() : 선택한 요소의 스크롤바 수직 위치를 반환하거나 
스크롤바 수직위치를 정해줌 
$(window).scrollTop() :  현재 스크롤의 위치 반환 
$(window).scrollTop(500)  스크롤바 수직 위치를 500으로 정함 
유동적 값

.offset().top
선택한 요소의 위치를 가져오거나 특정 위치로 이동  
문서안에서 상대적인 현재 위치값  
고정적 값
offset().top
header : 0 ~ 100 
visual : 100 ~ 600 
news : 600 ~ 1300
brand : 1300 ~ 2000
crew : 2000 ~ 2700  
footer : 2700~ 3160
 */