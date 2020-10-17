import React  from "react";
import { connect } from "react-redux";
import Nav from "../components/Nav"
// import "../../style.scss";

class View extends React.Component {
    constructor(props){
        super(props);    
        this.state = {            
            filterData : []
        } 
           
    }
    componentDidMount(){
        const id = this.props.match.params.id;
        const {blogData} = this.props;
        if(!id) {
            this.props.history.push('/blog');
        }
        let blogFilterData = [];
        if (blogData && blogData.length > 0) {
            blogFilterData = blogData.filter(x => {           
                return x.id == id;
            });
        }                  
        this.setState({filterData : blogFilterData});        
    }
     
    getBack = () => { 
        console.log("Back");       
        this.props.history.push('/blog');
    }  
    
       
    
    render(){
        const { filterData } = this.state;    
        const blog = filterData && filterData[0] ? filterData[0] : {};
        return (      
            <div className="mainWrapper">
                <Nav title="Blog View Page" />               
                <div className="midWrapper">
                    <div className="formBox clearfix">
                        <div className="row">
                            <div className="span_1"><label>Title</label></div>
                            <div className="span_2">{blog.title}</div>
                        </div>
                        <div className="row">
                            <div className="span_1"><label>Description</label></div>
                            <div className="span_2">{blog.body}</div>
                        </div>                        
                        <div className="row">
                            <div className="span_1">&nbsp;</div>
                            <div className="span_2"><button className="btn_submit" onClick={this.getBack} >Back</button></div>
                        </div>
                    
                    </div>
                </div>                
            
            </div>
        )
        
       
    }
}
const mapStateToProps = state => {
    const { Blog } = state;     
    return {
        blogData: Blog.data
    };
};
  
 
export default connect(
    mapStateToProps
  )(View);