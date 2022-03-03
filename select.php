<?PHP
    $servername = 'localhost';
    $username   = 'yoozzang';
    $password   = 'as3785as^^';
    $dbname     = 'yoozzang';


    $conn = mysqli_connect($servername, $username, $password, $dbname); 
    mysqli_set_charset($conn, 'utf8');

    if( !$conn ){
        die('데이터베이스 서버에 접속 실패!');
    }


    //정보검색 입력된 모든 데이터 가져오기 배열처리
    //SQL - SELECT(정보검색)
    $sql = "select * from member_startbucks";
    $result = mysqli_query($conn, $sql);



    //배열처리(객체) 변수 선언
    $arr = array();

    //데이터가 존재하면 실행
    if( mysqli_num_rows($result) > 0 ){

        while( $row = mysqli_fetch_array($result) ){
            array_push($arr, array(
                "번호"      =>  $row['bun'],
                "아이디"    =>  $row['id'],
                "비밀번호"  =>  $row['pwd'],
                "이름"      =>  $row['name'],
                "전화번호"  =>  $row['tel'],
                "이메일"    =>  $row['email']
            ));
        }

    }

    //JSON(객체) 데이터로 변환
    $json = json_encode($arr, JSON_UNESCAPED_UNICODE);
            file_put_contents('./data/member.json', $json);


    echo $json;

    mysqli_close($conn);

?>
