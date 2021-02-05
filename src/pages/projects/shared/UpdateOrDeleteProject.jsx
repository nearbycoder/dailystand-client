import React from 'react';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ProjectForm from './ProjectForm';
import { updateResource, deleteResource } from 'utils/cacheUtils';
import {
  PROJECTS,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from 'queries/projectQueries';

const UpdateProjectSchema = Yup.object().shape({
  id: Yup.string().required('Required'),
  name: Yup.string().required('Required'),
  description: Yup.string(),
});

export default function UpdateOrDeleteProject({ project, onClose }) {
  const [updateProject] = useMutation(UPDATE_PROJECT, {
    update: updateResource(onClose, PROJECTS, 'updateProject', 'projects'),
  });
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    update: deleteResource(onClose, PROJECTS, 'deleteProject', 'projects'),
  });

  const formik = useFormik({
    validationSchema: UpdateProjectSchema,
    initialValues: {
      id: project.id,
      name: project.name,
      description: project.description,
    },
    onSubmit: async (values) => {
      await updateProject({ variables: { input: values } });
    },
  });

  const onDelete = async () => {
    await deleteProject({
      variables: { input: { id: project.id } },
    });
  };

  return (
    <ProjectForm
      formik={formik}
      onClose={onClose}
      onDelete={onDelete}
      action="Update"
      title="Update Project"
      description="Update or delete one of your existing projects."
    />
  );
}
