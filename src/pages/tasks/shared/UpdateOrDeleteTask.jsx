import React from 'react';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TaskForm from './TaskForm';
import { updateResource, deleteResource } from 'utils/cacheUtils';
import { TASKS, UPDATE_TASK, DELETE_TASK } from 'queries/taskQueries';

const UpdateTaskSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string(),
});

export default function UpdateOrDeleteTask({ task, onClose }) {
  const [updateTask] = useMutation(UPDATE_TASK, {
    update: updateResource(onClose, TASKS, 'updateTask', 'tasks'),
  });
  const [deleteTask] = useMutation(DELETE_TASK, {
    update: deleteResource(onClose, TASKS, 'deleteTask', 'tasks'),
  });

  const formik = useFormik({
    validationSchema: UpdateTaskSchema,
    initialValues: {
      id: task.id,
      name: task.name,
      description: task.description,
      projectId: task.project.id,
    },
    onSubmit: async (values) => {
      await updateTask({ variables: { input: values } });
    },
  });

  const onDelete = async () => {
    await deleteTask({
      variables: { input: { id: task.id } },
    });
  };

  return (
    <TaskForm
      formik={formik}
      onClose={onClose}
      onDelete={onDelete}
      action="Update"
      title="Update Task"
      description="Update or delete one of your existing tasks."
    />
  );
}
