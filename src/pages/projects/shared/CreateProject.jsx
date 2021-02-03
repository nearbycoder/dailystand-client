import React from 'react';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ProjectForm from './ProjectForm';
import { addResource } from 'utils/cacheUtils';
import { PROJECTS, CREATE_PROJECT } from 'queries/projectQueries';

const CreateProjectSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string(),
});

export default function CreateProject({ onClose }) {
  const [createProject] = useMutation(CREATE_PROJECT, {
    update: addResource(onClose, PROJECTS, 'createProject', 'projects'),
  });

  const formik = useFormik({
    validationSchema: CreateProjectSchema,
    initialValues: {
      name: '',
      description: '',
    },
    onSubmit: async (values) => {
      try {
        const {
          data: { createProject: data },
        } = await createProject({ variables: { input: values } });

        if (data?.id) {
          onClose();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <ProjectForm
      formik={formik}
      onClose={onClose}
      action="Create"
      title="New Task"
      description=" Get started by filling in the information below to create your new
      project."
    />
  );
}
