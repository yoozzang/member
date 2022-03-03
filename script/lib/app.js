// 1. 리액트-돔과 돔컨테이너 연결(등록)
// 2. 리액트-돔과 메인 컴포넌트 연결(등록)
// 3. 컴포넌트 생성 그리고 템플릿 생성
class MainComponent extends React.Component {
  render(){
    return(
        <>
          <div id='login'>
              <div className='contaniner'>
                <div className='wrap'>
                    <div className='title'>
                      <h1>{this.props.title}</h1>
                    </div>
                    <div className='content'>
                      <LoginComponent></LoginComponent>
                    </div>
                </div>
              </div>
          </div>
        </>
    )
  }
}

class LoginComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        todo: [],
        count:1,      //카운트 다음입력 번호: 1씩증가
        idText:'',    //아이디
        pwdText:'',   //비밀번호
        nameText:'',  //이름
        telText:'',    //연락처
        emailText:''  //이메일
    }
  }

  // moonjong2.dothome.co.kr/react_form/
  // .then() 을 통해서 통신에 성공했을때 response가 반환되고, 
  // .catch() 를 통해서 통신 실패 했을때 error가 반환

  getDBData = async()=>{
      let response = await axios.get('./select.php');
        // console.log('data =  ' + JSON.stringify(data));
        // console.log('data.data =  ' + JSON.stringify(data.data) );
      // let result = response.data;
        // console.log('data =  ' + JSON.stringify(data) );
        this.setState({todo: response.data});
        // console.log('todo[] ', this.state.todo);
        this.setState({count: response.data.length});
        console.log('번호 count : ', this.state.count )
  } 
  
 
  componentDidMount(){
    console.log(' React의 생명 주기(Life Cycle) : componentDidMount() ');
    this.getDBData();

  }
    
  componentDidUpdate(){
    console.log(' React의 생명 주기(Life Cycle) : componentDidUpdate() ');
  }
    
  componentWillUnmount(){
    console.log(' React의 생명 주기(Life Cycle) : componentWillUnmount() ');
  }

  
        
  





  //id
  onChangeIdfn = (e) => {    
    this.setState({idText: e.target.value });
  }
  //password
  onChangePasswordfn = (e) => {
    this.setState({pwdText: e.target.value });
  }
  //name
  onChangeNamefn = (e) => {
    this.setState({nameText: e.target.value });
  }
  //tel
  onChangeTelfn = (e) => {
    this.setState({telText: e.target.value });
  }
  //email
  onChangeEmailfn = (e) => {
    this.setState({emailText: e.target.value });
  }

  //할일 추가 저장 클릭 이벤트
  onClickfn = (e) => {
    e.preventDefault();
    const { todo, count, idText, pwdText, nameText, telText, emailText } = this.state;
    //입력상자엔 빈간이 있으면 입력 취소
    if(idText=='' || pwdText==''){
        return;
    }
      this.getDBData();

      //카운트셋팅
      this.setState({count: count+1});
      
      // 다음 입력을 위해 공백처리 제목과 내용
      this.setState({idText: '' });
      this.setState({pwdText: '' });
      this.setState({nameText: '' });
      this.setState({telText: '' });
      this.setState({emailText: '' });

      // 폼데이터 추가
      var formData = new FormData();
          formData.append('num', count);            //번호
          formData.append('id', idText);            //아이디
          formData.append('pwd', pwdText);          //비밀번호
          formData.append('name', nameText);        //이름
          formData.append('tel', telText);          //연락처
          formData.append('email', emailText);      //이메일

      //엑시오스 전송
      axios({
          url:'./reponse.php',
          method:'POST',
          data: formData
      })
      .then((res)=>{
          console.log('전송결과 ', res );

      })
      .catch((error)=>{ //실패메시지
          alert('AXIOS Error!!!');
          console.log( error );
      });


  }

  render(){

    const { todo, count, idText, pwdText, nameText, telText, emailText  } = this.state;

    return(
        <>
          <div className='login-form'>
              <ul>
                <li>
                    <label>아이디</label>
                    <input type='text' value={idText} onChange={this.onChangeIdfn} placeholder='아이디를 입력하세요!' />
                </li>
                <li>
                    <label>비밀번호</label>
                    <input type='text' value={pwdText} onChange={this.onChangePasswordfn} placeholder='비밀번호를 입력하세요!' />
                </li>
                <li>
                    <label>이름</label>
                    <input type='text' value={nameText} onChange={this.onChangeNamefn} placeholder='이름을 입력하세요!' />
                </li>
                <li>
                    <label>연락처</label>
                    <input type='text' value={telText} onChange={this.onChangeTelfn} placeholder='연락처를 입력하세요!' />
                </li>
                <li>
                    <label>이메일</label>
                    <input type='text' value={emailText} onChange={this.onChangeEmailfn} placeholder='이메일을 입력하세요!' />
                </li>
                <li>                   
                    <button type='submit' onClick={this.onClickfn}>ADD</button>
                </li>
              </ul>
          </div>

          
          <ListComponent  todo={todo} />
       
          

        </>
    )
  }
}

class ListComponent extends React.Component {
  render(){    

      const { todo } = this.props;

      const todolist = todo.map((item)=>{
        return(
            <tr key={item.번호}>
              <td>{item.번호}</td>
              <td>{item.이름}</td>
              <td>{item.비밀번호}</td>
              <td>{item.전화번호}</td>
              <td>{item.이메일}</td>
            </tr>
        )
      });


    return(
        <>
            <div className='login-list'>
               <h2 style={{fontSize:'20px', color:'#59b', textAlign:'center'}}>회원 목록 List</h2>
               <table>
                  {
                   todolist
                  }
               </table>
            </div>
        </>
    )
  }
}


MainComponent.defaultProps = {
  title: '회원 가입'
}

ReactDOM.render(
  <MainComponent/>,
  document.querySelector('#app')
);