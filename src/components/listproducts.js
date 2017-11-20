import React, { Component  } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchProducts,adjustModel} from '../actions/index';
import {Grid,Row,Col,Button,Modal} from 'react-bootstrap';
import { Link } from 'react-router';


class Products extends Component {
  	
  	constructor(props) {
    	super(props);
    	this.state = {
         pendingRequest:false,
         value:'select',
         showModal:false,
         model:'',
         models:[],
         elementId:'',
         modaldropdownvalue:'',
         newModelState : false,
         newModelInput:''
      }
    this.renderPosts = this.renderPosts.bind(this);
    this.renderModel = this.renderModel.bind(this);
    this.renderDropdown = this.renderDropdown.bind(this);
    this.change = this.change.bind(this);
    this.ModalDropdownChange = this.ModalDropdownChange.bind(this);
    this.renderDropdownModel = this.renderDropdownModel.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.changeModel = this.changeModel.bind(this);
    this.renderModalDropdownModel = this.renderModalDropdownModel.bind(this);
    this.updateModel = this.updateModel.bind(this);
    this.addNewModel = this.addNewModel.bind(this);
    this.handleNewModelinput = this.handleNewModelinput.bind(this);
  	}

/*    static contextTypes = {
      router : PropTypes.object
    }*/

  	componentWillMount(){
      if(this.props.data.length == 0){
        this.props.fetchProducts().then(() => {
          console.log(this.props.data);
          this.setState({pendingRequest:true});
          this.setState({value:this.props.data[0].mark});
        })
      }
      else(this.setState({pendingRequest:true}))
    }
    changeModel(x,y,z){
      this.setState({model:x});
      this.setState({models:y});
      this.setState({elementId:z});
    }
    renderModel(k){
      return(k.articles.map((u,i)=>{
                return(<Col id={i} xs={6} md={4} lg={12} > 
                          {u.articles.length>0?
                          <Grid >
                          <h5>{u.model}</h5>
                          {
                            u.articles.map((b)=>{
                            return (
                              <Col md={4} >
                                <Row style={{backgroundColor:'#efefef',margin:2,padding:5}}>
                                  <Col md={6}>
                                    <img src={b.imgs[0]} 
                                         style={{width:100}} />
                                  </Col>
                                  <Col md={6}>
                                    <a href={b.url}>
                                      <h5>{b.model}</h5>
                                    </a>
                                    <h6>{b.price}</h6>
                                    <h6>{b.source}</h6>
                                    <input type="checkbox" 
                                           name={b.model} 
                                           value={b[1]} />
                                  </Col>
                                </Row>
                              </Col>
                              )
                          })
                          };
                          <Button bsStyle="primary" 
                                  style={{float:'right',bottom:0}} 
                                  onClick={()=>{this.open();this.changeModel(u.model,k.models,k._id)}}>
                              Adjust model
                          </Button>
                          </Grid>: null}
                        </Col> )
                }));
    }
  	renderPosts(){
      if(this.props.data.length==0){
          return(<li id="key0">Loading Zab ...</li>)
      }else {
        return(
            this.props.data.map((k) => {
              if(this.state.value == k.mark){
          return (<Col  key={k.mark} xs={6} md={4} lg={12}>
                <h3>{k.mark}</h3>
                <select>
                  {this.renderDropdownModel(k)}
                </select>
                {this.renderModel(k)}

            </Col>)
       }}))
      }
    }
    updateModel(){
      let newModelValue ;
      this.state.newModelState ? newModelValue = this.state.newModelInput.toLowerCase() : newModelValue=this.state.modaldropdownvalue; 
      this.state.modaldropdownvalue;
      if(newModelValue.length>0){
        if(this.state.model !== newModelValue){
          this.props.data.map((k)=>{
            if(k._id == this.state.elementId ){
              let obj = k ;
              obj.articles.map((u)=>{
                if(u.model == this.state.model){
                  let articles = u.articles;
                  if(this.state.newModelState == false){
                    obj.articles.map((b)=>{
                      if(b.model == newModelValue){
                        articles.map((o)=>{
                          o.model = newModelValue;
                          b.articles.push(o);
                        })
                      }
                    })
                  }
                  else{
                    let pos = k.models.indexOf(newModelValue);
                    if(pos<0){
                      k.models.push(newModelValue);
                      var item = {};
                      item.model = newModelValue;
                      item.articles = [];
                      articles.map((o)=>{
                        o.model = newModelValue;
                        item.articles.push(o);
                      })
                      k.articles.push(item);
                    }
                    else{
                      obj.articles.map((b)=>{
                        if(b.model == newModelValue){
                          articles.map((o)=>{
                            o.model = newModelValue;
                            b.articles.push(o);
                          })
                        }
                      })
                    }
                  }
                  u.articles=[];
                  let pos = k.models.indexOf(this.state.model);
                  k.models.splice(pos,1);
                  this.setState({newModelState:false});
                  this.props.adjustModel({id:this.state.elementId,data:k});
                }
              })
            } 
          })
        }
        
      }
    }
    renderDropdownModel(k){
      if(k.models.length==0){
          return(<option id="Loading">Loading Zab ...</option>)
      }else {
        return(k.models.map((u) => {
          return (<option value={u}>{u}</option>)
        }))
      }
    }
    renderModalDropdownModel(k){
    //  let k = this.state.models;
     if(k.length==0){
          return(<option id="Loading">Loading Zab ...</option>)
      }else {
        return(k.map((u) => {
          if(u !== this.state.model){
            return (<option value={u}>{u}</option>)
          }
          else{
            return (<option selected value={u}>{u}</option>) 
          }
        }))
      }
    } 
    renderDropdown(){
      if(this.props.data.length==0){
          return(<option id="Loading">Loading Zab ...</option>)
      }else {
        return(this.props.data.map((k) => {
          return (<option value={k.mark}>{k.mark}</option>)
        }))
      }
    }
    close() {
      this.setState({ showModal: false });
    }
    open() {
      this.setState({ showModal: true });
    }
    ModalDropdownChange = (event)=>{
      this.setState({modaldropdownvalue: event.target.value});
    }
    change = (event)=>{
         this.setState({value: event.target.value});
         this.renderPosts();
    }
    addNewModel = (event)=>{
      this.setState({newModelState:event.target.checked})
    }
    handleNewModelinput = (event)=>{
      this.setState({newModelInput:event.target.value})
    }
	render() {
    return (
      <div className="container">
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header>
            <Modal.Title>Change Product Model</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <select onChange={this.ModalDropdownChange}  
                    style={{width:100},this.state.newModelState?{backgroundColor: '#e6e6e6'}:{backgroundColor: '#fff'}} 
                    disabled={this.state.newModelState}>
              {this.renderModalDropdownModel(this.state.models)}
            </select>
            {this.state.modaldropdownvalue}
            <div>
              <input type="checkbox" 
                     name="test" 
                     value="test" 
                     onChange={this.addNewModel} /> 
                or Create a new model
            </div>
            {this.state.newModelState?
              <input type="text" 
                     value={this.state.newModelInput}
                     onChange={this.handleNewModelinput}/>
            :null}

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
            <Button bsStyle="primary" 
                    onClick={this.updateModel}>
                Save changes
            </Button>
          </Modal.Footer>
        </Modal>
        <select onChange={this.change} 
                value={this.state.value}>
            {this.renderDropdown()}
        </select>
        <Grid>
        <Row lassName="show-grid">
          {this.renderPosts()}
        </Row>
        </Grid>
        <Button style={{float:'right',marginTop:5,marginBottom:5}}>Add Simular product</Button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchProducts,adjustModel}, dispatch);
}

function mapStateToProps(state){
  return ({ data : state.product.data});
}

export default connect(mapStateToProps,mapDispatchToProps)(Products);