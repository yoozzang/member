

function App() {
    return (
        <div className="app">
            <h1>회원가입</h1>
            <SignUpComponent/>
        </div>
    );
}



class SignUpComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            member:[],
            bun: 1,
            txtId:'',
            txtPwd:'',
            txtName:'',
            txtTel:'',
            txtEmail:''
        }
    }


    //DB 서버에서 테이블 데이터를 가져오기 해서
    //배열에 저장하고 그걸 목록에 출력한다.
    //리액트 라이프 사이클
    //async(비동기식전송) > await(기다려)
    getData = () => {
        axios({
            url:'./select.php',
            method:'GET'
        })
        .then((result)=>{
            this.setState({member: result.data});
            this.setState({bun: result.data.length}); //전
        })
        .catch((err)=>{
            console.log(err);
        });
    }


    componentDidMount(){
        this.getData();
    }
    componentDidUpdate(){      
        console.log('수정되었습니다.componentDidUpdate()')
    }



    onChangeIdfn = (e) => {
        e.preventDefault();
        this.setState({txtId: e.target.value });
    }


    onChangePwdfn = (e) => {
        e.preventDefault();
        this.setState({txtPwd: e.target.value });
    }

    onChangeNamefn = (e) => {
        e.preventDefault();
        this.setState({txtName: e.target.value });
    }


    onChangeTelfn = (e) => {
        e.preventDefault();
        this.setState({txtTel: e.target.value });
    }

    onChangeEmailfn = (e) => {
        e.preventDefault();
        this.setState({txtEmail: e.target.value });
    }

    //submitfn 클릭이벤트 - 전송
    submitfn = (e) => {        
        e.preventDefault();
        const {bun,txtId,txtPwd,txtName,txtTel,txtEmail} = this.state;
       
        this.setState({bun: this.state.bun + 1});
        this.setState({txtId:''});
        this.setState({txtPwd:''});
        this.setState({txtName:''});
        this.setState({txtTel:''});
        this.setState({txtEmail:''});


        //폼데이터 생성
        // let 객체 = new 기본생성자이름();
        let formData = new FormData();
            formData.append('bun', bun); //번호
            formData.append('id', txtId); //아이디
            formData.append('pwd', txtPwd); //비밀번호
            formData.append('name', txtName); //이름
            formData.append('tel', txtTel); //연락처
            formData.append('email', txtEmail); //이메일

 
        //프로미스 비동기식 전송방식  
        //JSON 데이터 형식(객체) 지원  
        axios({ 
            url:'./response.php',
            method:'POST',
            data: formData
        })
        .then((result) => { //성공
            this.setState({member: result.data});
        }).catch((err) => { //실패
            console.log(err);
        });
          

    

    } //클릭 이벤트 끝

    render() {

        const {txtId,txtPwd,txtName,txtTel,txtEmail} = this.state;

        return (
            <div className='member-form'>
                <div className='form-box'>
                    <ul>
                        <li>
                            <input type='text' id='txtId' value={txtId} onChange={this.onChangeIdfn} placeholder="아이디를 입력!"/>
                        </li>
                        <li>
                            <input type='text' id='txtPwd' value={txtPwd} onChange={this.onChangePwdfn} placeholder="비밀번호를 입력!"/>
                        </li>
                        <li>
                            <input type='text' id='txtPwd' value={txtName} onChange={this.onChangeNamefn} placeholder="이름을 입력!"/>
                        </li>
                        <li>
                            <input type='text' id='txtPwd' value={txtTel} onChange={this.onChangeTelfn} placeholder="전화번호 입력!"/>
                        </li>
                        <li>
                            <input type='text' id='txtPwd' value={txtEmail} onChange={this.onChangeEmailfn} placeholder="이메일을 입력!"/>
                        </li>
                        <li>                         
                            <button type='submit' onClick={this.submitfn}>SUBMIT</button>
                        </li>
                    </ul>
                </div> 

                <ListComponent  member={this.state.member}/>

            </div>
        );
    }
}

class ListComponent extends React.Component {

    render() {
        const {member} = this.props;
         
        console.log(member);

        const meberList = member.map((item)=>{
              return(
                <li key={item.번호}>
                    <span>{item.번호}</span>
                    <span>{item.아이디}</span>
                    <span>{item.비밀번호}</span>
                    <span>{item.이름}</span>
                    <span>{item.전화번호}</span>
                    <span>{item.이메일}</span>
                </li>
              )      
        });
           
        return (
            <>
               <div class='membet-list'>
                   <ul>
                      {meberList} 
                   </ul>                   
               </div> 
            </>
        );
    }
}



ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
);