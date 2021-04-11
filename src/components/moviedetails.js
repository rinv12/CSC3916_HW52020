import React, {Component} from "react";
import {addReview, fetchMovie} from "../actions/movieActions";
import {connect} from "react-redux/lib/connect/connect";
import {Card, ListGroup, ListGroupItem, Form, Button} from "react-bootstrap";
import {BsStarfill} from 'react-icons/bs';
import {Image} from "react-bootstrap";

class Moviedetails extends Component {
    constructor(props) {
        super(props);
        console.log('props', props);

        this.updateDetail = this.updateDetail.bind(this);
        this.submitReview = this.submitReview.bind(this);

        this.state = {
            details: {
                title: '',
                comment: '',
                rating: 0
            }
        }
    }

    submitReview() {
        const {dispatch} = this.props;
        if (this.state.details.comment === "" || this.state.details.rating === 0) {
            alert("movie has no rating or review")
        } else {
            dispatch(addReview(this.state.details));
        }
    }

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null) {
            dispatch(fetchMovie(this.props.movieId))
        }
    }

    updateMovieDetails(event) {
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        updateDetails['title'] = this.props.selectedMovie.title;
        this.setState({
            details: updateDetails
        });
    }

    render() {
        if (!this.props.selectedMovie) {
            return <div>Loading, please wait...</div>
        }
        return (
            <Card>
                <Card.Header>Movie Details</Card.Header>
                <Card.Body>
                    <Image className="poster" src={this.props.selectedMovie.imageURL} thumbnail/>
                </Card.Body>
                <ListGroup>
                    <ListGroupItem>{this.props.selectedMovie.title}</ListGroupItem>
                    <ListGroupItem>
                        {this.props.selectedMovie.actors.map((actor, i) =>
                            <p key={i}>
                                <b>{actor.actor_name}</b> {actor.character_name}
                            </p>)}
                    </ListGroupItem>
                    <ListGroupItem><h4><BsStarfill/>{this.props.selectedMovie.AverageReviews}</h4></ListGroupItem>
                </ListGroup>
                <Card.Body>
                    {
                        this.props.selectedMovie.MovieReview.map((review, i) =>
                            <p key={i}>
                                <b>{review.username}</b> &nbsp;{review.comment}
                                &nbsp; <BsStarfill/>{review.comment}
                            </p>)}
                </Card.Body>
                <Card.Header>Add Movie Review</Card.Header>
                <Form className='form-horizontal'>
                    <Form.Group controlID="comment">
                        <Form.Label>User comment</Form.Label>
                        <Form.Control onChange={this.updateDetail} value={this.state.details.rating} type="Number"
                                      min="1" max="5"
                                      placeholder="Rating: max:5 min:1"/>
                    </Form.Group>
                    <Button onClick={this.submitReview()}>Submit</Button>
                </Form>
            </Card>
        )
    }
}
    const mapStateToProps = (state) =>{
        console.log()
        return{
            selectedMovie: state.movie.selectedMovie
        }
    }

    export  default connect(mapStateToProps)(Moviedetails);