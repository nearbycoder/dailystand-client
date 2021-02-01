import React, { useState } from 'react';
import PaneLayout from 'layout/PaneLayout';
import List from 'components/List';
import ProjectListItem from './shared/ProjectListItem';
import SlideOver from 'components/SlideOver';
import CreateProject from './shared/CreateProject';
import { useQuery, gql } from '@apollo/client';
import get from 'lodash/get';

const PROJECTS = gql`
  query Projects {
    projects {
      nodes {
        id
        name
        description
        createdAt
        updatedAt
      }
    }
  }
`;

export default function ProjectsPage() {
  const { data, loading, error, refetch } = useQuery(PROJECTS);
  const [openSlideOver, setOpenSlideOver] = useState(false);

  return (
    <>
      <SlideOver open={openSlideOver} onClose={() => setOpenSlideOver(false)}>
        <CreateProject
          refetch={refetch}
          onClose={() => setOpenSlideOver(false)}
        />
      </SlideOver>
      <PaneLayout
        pageTitle="Projects"
        actionTitle="New Project"
        loading={loading}
        actionOnClick={() => setOpenSlideOver(true)}>
        <List>
          {get(data, 'projects.nodes', []).map((project) => (
            <ProjectListItem
              project={project}
              refetch={refetch}
              key={project.id}
            />
          ))}
        </List>
      </PaneLayout>
    </>
  );
}
