import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Col,
  Form, FormGroup, Input, Label, Progress
} from 'reactstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { editorConfiguration } from '../../components/editor/EditorConfig';
import axios from 'axios';

const PostWrite = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [selector, setSelector] = useState([]);

  const [form, setValue] = useState({ title: '', category: 0, Subject: '' });
  // const dispatch = useDispatch();

  useEffect(() => {
    const config = async () => {
      const res = await axios.get('/unitshosting');
      return res.data;
    };

    config().then((r) => setSelector(r));
  }, []);

  const onChange = (e) => {
    setValue({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const getDataFromCKEditor = (event, editor) => {
    const data = editor.getData();
    console.log(data);
    setValue({
      ...form,
      Subject: data
    });
  };

  // const onSubmit = async (e) => {
  //   await e.prevenDefault();
  // const { title, contents, category}
  // };
  return (
    <>
      {isAuthenticated ? (
        <Form>
          <FormGroup className="mb-3">
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              className="form-control"
              onChange={onChange}
            />
            <Label for="category">Category</Label>
            <Input
              type="select"
              name="category"
              id="category"
              className="form-control"
              onChange={onChange}
            >
              {selector.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
            </Input>
            <Label for="title">Subject</Label>
            <CKEditor
              editor={ClassicEditor}
              config={editorConfiguration}
              // onInit={Myinit}
              onBlur={getDataFromCKEditor}
            />
            <Button
              color="success"
              block
              className="mt-3 col-md-2 offset-md-10 mb-3"
            >
              저장하기
            </Button>
          </FormGroup>
        </Form>
      ) : (
        <Col width={50} className="p-5 m-5">
          <Progress animated color="info" value={100} />
        </Col>
      )}
    </>
  );
};

export default PostWrite;
