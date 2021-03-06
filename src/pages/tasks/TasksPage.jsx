import React, { useState, Fragment } from 'react';
import PaneLayout from 'layout/PaneLayout';
import List from 'components/List';
import TaskListItem from './shared/TaskListItem';
import SlideOver from 'components/SlideOver';
import CreateTask from './shared/CreateTask';
import { useQuery } from '@apollo/client';
import get from 'lodash/get';
import { TASKS } from 'queries/taskQueries';

export default function TasksPage() {
  const { data, loading } = useQuery(TASKS, {
    fetchPolicy: 'network-only',
  });
  const [openSlideOver, setOpenSlideOver] = useState(false);

  const onClose = () => setOpenSlideOver(false);

  return (
    <Fragment>
      <SlideOver open={openSlideOver} onClose={onClose}>
        <CreateTask onClose={onClose} />
      </SlideOver>
      <PaneLayout
        pageTitle="All Tasks"
        actionTitle="New Task"
        loading={loading}
        actionOnClick={() => setOpenSlideOver(true)}>
        <List>
          {get(data, 'tasks.nodes', []).map((task) => (
            <TaskListItem task={task} key={task.id} />
          ))}
        </List>
      </PaneLayout>
    </Fragment>
  );
}
