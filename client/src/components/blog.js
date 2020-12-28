import React, { Component, Fragment } from 'react';
import { Form, Button, } from 'react-bootstrap';
import { post } from '../actions/auth'
import AppNavbar from './navbar';
import { AuthContext } from '../contexts/AuthContext'



class Post extends Component {

    static contextType = AuthContext;

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = e => {

        const { author_name, author_email, content, title } = this.state;

        //Sending New Post
        const newBlog = {
            author_name: this.context.currentUser, author_email: this.context.currentEmail, content, title
        }

        // Register
        post(newBlog, res => {
            if (res.data.success) {
                this.setState({
                    msg: res.data.msg,
                    variant: "success"
                })
                this.context.login(res)
            } else {
                this.setState({
                    msg: res.data.msg,
                    variant: "danger"
                })
            }
        })
    }

    render() {

        if (!this.context.isAuthenticated) {
            return (

                <Fragment>
                    <AppNavbar />
                    <div class="homeCenter">
                        <h2>Something Went Wrong</h2>
                    </div>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <AppNavbar />
                    <div>
                        <div style={{
                            marginTop : '10px',
                            marginLeft: '10%'
                        }}>
                            <Button variant="primary" href='/'>Home</Button>
                        </div>

                        <Form onSubmit={this.onSubmit} id="register">

                            <Form.Group>
                                <h4>Post here...</h4>
                            </Form.Group>

                            <Form.Group controlId="formBasicName">
                                <Form.Label>Title</Form.Label>
                                <Form.Control name="title" onChange={this.onChange} type="text" placeholder="Title" />
                            </Form.Group>


                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Content</Form.Label>
                                <Form.Control as="textarea" rows={3} name="content" onChange={this.onChange} type="text" placeholder="Content" />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </Fragment>
            )
        }
    }
}

export default Post;