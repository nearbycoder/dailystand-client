import React, { useState } from 'react';
import PaneLayout from 'layout/PaneLayout';
import List from 'components/List';
import TaskListItem from './shared/TaskListItem';
import SlideOver from 'components/SlideOver';
import CreateTask from './shared/CreateTask';
import { useQuery, gql } from '@apollo/client';
import get from 'lodash/get';

const TASKS = gql`
  query Tasks {
    tasks {
      nodes {
        id
        name
        description
        createdAt
        updatedAt
        project {
          id
          name
        }
      }
    }
  }
`;

export default function ProjectsPage() {
  const { data, loading, error, refetch } = useQuery(TASKS);
  const [openSlideOver, setOpenSlideOver] = useState(false);

  return (
    <>
      <SlideOver open={openSlideOver} onClose={() => setOpenSlideOver(false)}>
        <CreateTask refetch={refetch} onClose={() => setOpenSlideOver(false)} />
      </SlideOver>
      <PaneLayout
        pageTitle="All Tasks"
        actionTitle="New Task"
        loading={loading}
        actionOnClick={() => setOpenSlideOver(true)}>
        <List>
          {get(data, 'tasks.nodes', []).map((task) => (
            <TaskListItem task={task} refetch={refetch} key={task.id} />
          ))}
        </List>
      </PaneLayout>
    </>
  );
}
