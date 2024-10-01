import {Component} from 'react'
import Loader from 'react-loader-spinner'

import BlogItem from '../BlogItem'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class BlogsList extends Component {
  state = {blogsList: [], isLoadding: true}

  componentDidMount() {
    this.getBlogsLists()
  }

  getBlogsLists = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    console.log(data)
    const updatedData = data.map(eachBlog => ({
      author: eachBlog.author,
      avatarUrl: eachBlog.avatar_url,
      id: eachBlog.id,
      topic: eachBlog.topic,
      title: eachBlog.title,
      imageUrl: eachBlog.image_url,
    }))
    this.setState({blogsList: updatedData, isLoadding: false})
  }

  render() {
    const {blogsList, isLoadding} = this.state
    return (
      <div className="blog-list-container">
        {isLoadding ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          blogsList.map(item => <BlogItem blogData={item} key={item.id} />)
        )}
      </div>
    )
  }
}

export default BlogsList
