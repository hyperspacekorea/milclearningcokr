jQuery(function(){
	var $str = "<div class='tnb'><nav>";
		$str += "<ul><li><a href='/'><img src='/wp-content/uploads/direct/ico_home.png'>HOME</a></li>";
		$str += "<li><a href='http://www.milcroom.co.kr' target='_blank'><img src='/wp-content/uploads/direct/ico_book.png'>STUDY ROOM</a></li>";
		$str += "<li><a href='http://academy.milcroom.co.kr/front/level/test_guide.jsp' target='_blank'><img src='/wp-content/uploads/direct/ico_test.png'>LEVEL TEST</a></li>";
        $str += "<li><a href='/franchisee/' target='_self'>가맹점 찾기</a></li>";
	jQuery("#header").prepend($str);
});

