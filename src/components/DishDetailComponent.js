/* eslint-disable react/jsx-pascal-case */
import React, { useState } from "react";
import { Control, Errors, LocalForm } from "react-redux-form";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalHeader,
  Button,
  ModalBody,
  Row,
  Label,
  Col,
} from "reactstrap";

const DishItem = ({ dish }) => {
  if (dish != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle> {dish.name}</CardTitle>
            <CardText> {dish.description} </CardText>
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return <div></div>;
  }
};
const DishComment = ({ comments, onClick }) => {
  // console.log(dish);
  if (comments == null) {
    return <div></div>;
  }
  const cmnts = comments.map((comment) => {
    return (
      <li key={comment.id}>
        <p>{comment.comment}</p>
        <p>
          -- {comment.author}, &nbsp;
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }).format(new Date(comment.date))}
        </p>
      </li>
    );
  });
  return (
    <div className="col-12 col-md-5 m-5">
      <h4> Comments </h4>
      <ul className="list-unstyled">{cmnts}</ul>
      <Button outline onClick={onClick}>
        <span className="fa fa-edit"></span>
        Comment
      </Button>
    </div>
  );
};

const DishDetail = (props) => {
  const required = (val) => val && val.length;
  const maxLength = (len) => (val) => !val || val.length <= len;
  const minLength = (len) => (val) => val && val.length >= len;
  const [postComment, setpostComment] = useState(false);
  const toggleModal = () => {
    setpostComment(!postComment);
  };
  if (props.dish != null) {
    console.log(props.dish.comments);
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <DishItem dish={props.dish} />
          <DishComment comments={props.comments} onClick={toggleModal} />

          <Modal isOpen={postComment} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Post a comment</ModalHeader>
            <ModalBody>
              <LocalForm>
                <Row className="form-group">
                  <Label htmlFor="rating" md={10}>
                    Give a rating
                  </Label>
                  <Col md={10}>
                    <Control.select
                      model=".rating"
                      id="rating"
                      name="rating"
                      className="form-control"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Control.select>
                  </Col>
                </Row>

                <Row className="form-group">
                  <Label htmlFor="author" md={10}>
                    Name
                  </Label>
                  <Col md={10}>
                    <Control.input
                      model=".author"
                      id="author"
                      name="author"
                      className="form-control"
                      validators={{
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(25),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".author"
                      show="touched"
                      messages={{
                        required: "Required",
                        validEmail: "Invalid Email Address",
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="post" md={10}>
                    Write your comment here
                  </Label>
                  <Col md={10}>
                    <Control.textarea
                      model=".post"
                      id="post"
                      name="post"
                      className="form-control"
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={{ size: 10 }}>
                    <Button type="submit" color="primary">
                      Post
                    </Button>
                  </Col>
                </Row>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  } else return <></>;
};

export default DishDetail;
