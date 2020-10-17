import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getBlogData } from '../actions/blog';
import Nav from "../components/Nav";
import MyLoaderImage from '../../images/ajax-loader.gif';

const Blog = props => {
    const searchInput = React.useRef();
    const [ isSearch, setSearch ] = useState(false);
    const [ serachResult, setSerachResult ] = useState([]);

    useEffect(() => {
        props.getBlogData(); 
    }, [ ]);

    const getSearch = () => {
        const { blogData } = props;
        const searchText = searchInput.current.value;
        if (searchText.trim()) {
            let dataArray = [];
            if (blogData && blogData.length > 0) {
                dataArray = blogData.filter(x => {           
                    return x.title.includes(searchText);
                });
            }
            setSerachResult(dataArray);
            setSearch(true);
        } else {           
            setSerachResult([]);
            setSearch(false)
        }        
    }        
    
    const getView = (id) => {
        console.log(id);
        props.history.push(`/blog/${id}`);
    }
    const { isPending, isError,  blogData } = props;                
    let data = isSearch ? serachResult : blogData;       
        
        return (      
            <div className="mainWrapper">
                <Nav title="Blog Page" />
                <div className="midWrapper">
                <div className="searchDiv">
                        <input type="text" name="search" ref={searchInput} placeholder="Search by title..." />
                        <button name="search" className="btn_submit"  onClick={getSearch} >Search</button>
                        
                </div>
                    <div className="tableBox">
                        <table width="100%" cellPadding="0" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>                                
                            </thead>
                            <tbody>
                                {
                                    !isPending&& data.length && !isError ? ( 
                                        data && data.map((blog,i) => {                    
                                            return (
                                            <tr key={i}>
                                                <td>{blog.title}</td>
                                                <td>{blog.body}</td>  
                                                <td className = "link" onClick={()=> getView(blog.id)}>View</td>                                           
                                            </tr>
                                            );
                                        })  
                                    ): 
                                    isError || isSearch ? (
                                        <tr><td colSpan="3">No Record Found!</td></tr>
                                    ) : (
                                        <tr><td colSpan="3" align="center"><img src={MyLoaderImage} alt="Loading...." /></td></tr>
                                    )
                                }
                            </tbody>
                        </table>        

                    </div>
                </div>
            </div>
        )
}
const mapStateToProps = state => {
    const { Blog } = state;     
    return {        
        isPending: Blog.isPending,
        isError: Blog.isError,  
        errorMessage: Blog.error.message,
        blogData: Blog.data
    };
};
  
  const mapDispatchToProps = dispatch => {
    return {        
        getBlogData: bindActionCreators(getBlogData, dispatch)       
    };
  };
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Blog);