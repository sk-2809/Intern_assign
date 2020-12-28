import React, { Component, Fragment } from 'react';
import AppNavbar from './navbar';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { AuthContext } from '../contexts/AuthContext'
import Jumbotron from 'react-bootstrap/Jumbotron'

class Home extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            arr: []
        }
    }

    componentDidMount() {
        var self = this;
        fetch("http://localhost:5000/post").then(function (response) {
            response.json().then(function (data) {
                self.setState({ loading: false, arr: data });
            });

        });
    }

    render() {

        if (!this.context.isAuthenticated) {
            return (
                <Fragment>
                    <AppNavbar />
                    <div class="homeCenter">
                        <Jumbotron>
                            <h1>Welcome to Our Website...!</h1>
                            <p>
                               You need to Register first, then You Can post Your Content.<br/>
                               If you are already register, You can login to see and post your content.
                            </p>
                            <p>
                                <Button variant="primary" href="/register">Register</Button> &nbsp;
                                <Button variant="primary" href="/login">Login</Button>
                            </p>
                        </Jumbotron>
                    </div>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <AppNavbar />
                    <div className="homeCenter">
                        <h1 align="center">Home</h1>
                        <div>
                            <Button variant="primary" href='/post'>Create Post</Button>
                        </div>
                        <br />

                        <div >
                            {
                                this.state.loading ? (
                                    <div>Loding Api</div>
                                ) : (
                                        <div>
                                            {
                                                this.state.arr.map(function (x) {
                                                    return <div key={x._id}><Card className="text-center" >
                                                        <Card.Header>By: {x.author_name}</Card.Header>
                                                        <Card.Body>
                                                            <Card.Title>{x.title}</Card.Title>
                                                            <Card.Text>
                                                                {x.content}
                                                            </Card.Text>
                                                        </Card.Body>
                                                        <Card.Footer className="text-muted">Posted on: {x.date_written}</Card.Footer>
                                                    </Card>
                                                        <br /></div>
                                                })

                                            }
                                        </div>
                                    )
                            }

                        </div>
                    </div>
                </Fragment>
            )
        }
    }
}

export default Home;