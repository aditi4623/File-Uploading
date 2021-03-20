import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import './style.css';
import swal from 'sweetalert';
import React, { Component } from 'react';
import Spinner from 'react-spinner-material';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { file: '',loading:false};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange = (e) => {
   
    let file = e.target.files[0];
    if(file.name){
      this.setState({file});
    }
  };
  handleSubmit(){
    var formdata = new FormData();
    let file=this.state.file;
    //this.state.loading=false;
    if(file.name){
      this.setState({loading:true})
    formdata.append("file", file, file.name);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
   
    fetch("https://nodefilesharing.herokuapp.com/upload", requestOptions)
      .then(response => response.json())
      .then(result =>{
        if(result.status==1){
          setTimeout(() => {
            this.setState({loading:false})
          }, 3000)
          swal("File Uploaded!", result.url, "success");
        }
         console.log(result);
        })

      .catch(error => console.log('error', error));
  }else{
    console.log("Select a file")
    swal("", "please Select a file", "warning");
  }
  }
  
  
  
  
  render() {
    return( 
      <div>
        <MDBContainer className="mt-5">
      <MDBRow>
        <MDBCol md="6" className="mx-auto mt-5">
          <MDBCard>
            <MDBCardBody className="mx-4">
              <div className="text-center">
                <h3 className="dark-grey-text mb-5">
                  <strong>Upload your file</strong>
                </h3>
              </div>
              <div className="input-group mb-5">
              
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  onChange={this.handleChange}
                  aria-describedby="inputGroupFileAddon01"
                />
              <label className="custom-file-label" htmlFor="inputGroupFile01">
                  Choose file
                </label>
              </div>
            </div>
              
              <div className="text-center mb-3">
              {this.state.loading ?  <center><Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={true} /></center> : <>

                <MDBBtn
                  type="button"
                  gradient="blue"
                  rounded
                  className="btn-block z-depth-1a"
                  onClick={this.handleSubmit}
                >
                  Upload
                </MDBBtn>
                </>}
              </div>
              
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    
      </div>
     )}
}


export default App;
