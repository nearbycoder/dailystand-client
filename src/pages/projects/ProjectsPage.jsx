import React, { useState, Fragment } from 'react';
import PaneLayout from 'layout/PaneLayout';
import SlideOver from 'components/SlideOver';
import List from 'components/List';
import ProjectListItem from './shared/ProjectListItem';
import CreateProject from './shared/CreateProject';
import { useQuery } from '@apollo/client';
import get from 'lodash/get';
import { PROJECTS } from 'queries/projectQueries';

export default function ProjectsPage() {
  const { data, loading } = useQuery(PROJECTS);
  const [openSlideOver, setOpenSlideOver] = useState(false);

  const onClose = () => setOpenSlideOver(false);

  return (
    <Fragment>
      <SlideOver open={openSlideOver} onClose={onClose}>
        <CreateProject onClose={onClose} />
      </SlideOver>
      <PaneLayout
        pageTitle="Projects"
        actionTitle="New Project"
        loading={loading}
        actionOnClick={() => setOpenSlideOver(true)}>
        <List>
          {get(data, 'projects.nodes', []).map((project) => (
            <ProjectListItem project={project} key={project.id} />
          ))}
        </List>
      </PaneLayout>
    </Fragment>
  );
}
