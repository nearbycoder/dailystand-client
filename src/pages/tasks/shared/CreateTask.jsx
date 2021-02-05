import React from 'react';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TaskForm from './TaskForm';
import { addResource } from 'utils/cacheUtils';
import { TASKS, CREATE_TASK } from 'queries/taskQueries';

const CreateTaskSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string(),
  projectId: Yup.string().required('Required'),
});

export default function CreateTask({ onClose }) {
  const [createTask] = useMutation(CREATE_TASK, {
    update: addResource(onClose, TASKS, 'createTask', 'tasks'),
  });

  const formik = useFormik({
    validationSchema: CreateTaskSchema,
    initialValues: {
      name: '',
      description: '',
      projectId: '',
    },
    onSubmit: async (values) => {
      const {
        data: { createTask: data },
      } = await createTask({ variables: { input: values } });

      if (data?.id) {
        onClose();
      }
    },
  });

  return (
    <TaskForm
      formik={formik}
      onClose={onClose}
      action="Create"
      title="New Task"
      description=" Get started by filling in the information below to create your new
      task."
    />
  );
}
