import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import EditWrap from '../../components/activityOne/edit/EditWrap';
import NotStarting from '../../components/activityOne/notStarting/NotStartingEdit';
import NotFinished from '../../components/activityOne/notFinished/NotFinishedEdit';
import MainHeader from '../../components/common/MainHeader';
import { setParamsID } from '../../store/modules/paramsid';
import {
  setDetailStart,
  setDetailEnd,
  setDetailGroup,
  setDetailSummary,
  setDetailJob,
  setDetailSkill,
  setDetailImage,
  setDetailFile,
  setDetailFilename,
  setDetailState,
  setDetailTitle,
} from '../../store/modules/detail';
import { setUseranswer, setAllData } from '../../store/modules/userdata';
import getOneActivity from '../../lib/api/activityOne/basic';

const ActivityOneEdit = ({ match }) => {
  const id = match.params.id;

  const dispatch = useDispatch();
  const saveID = data => dispatch(setParamsID(data));
  const saveStart = data => dispatch(setDetailStart(data));
  const saveEnd = data => dispatch(setDetailEnd(data));
  const saveGroup = data => dispatch(setDetailGroup(data));
  const saveSummary = data => dispatch(setDetailSummary(data));
  const saveJob = data => dispatch(setDetailJob(data));
  const saveSkill = data => dispatch(setDetailSkill(data));
  const saveImage = data => dispatch(setDetailImage(data));
  const saveFile = data => dispatch(setDetailFile(data));
  const saveState = data => dispatch(setDetailState(data));
  const saveFileName = data => dispatch(setDetailFilename(data));
  const saveDetailTitle = data => dispatch(setDetailTitle(data));
  const saveAllData = (question, idx) => dispatch(setAllData(question, idx));

  const detail = useSelector(state => state.detail);

  useEffect(() => {
    (async () => {
      saveID(id);
      const BasicData = await getOneActivity(id);
      saveStart(BasicData.selectedActivity.startDate);
      saveEnd(BasicData.selectedActivity.endDate);
      saveGroup(BasicData.selectedActivity.group);
      saveSummary(BasicData.selectedActivity.summary);
      saveJob(BasicData.jobTag);
      saveSkill(BasicData.skillTag);
      saveImage(BasicData.selectedActivity.imageUrl);
      saveFile(BasicData.selectedActivity.fileUrl);
      saveFileName(BasicData.selectedActivity.fileName);
      saveState(BasicData.isFinished);
      saveDetailTitle(BasicData.selectedActivity.title);
      if (BasicData.questionCards) {
        saveAllData(BasicData.questionCards);
      }
    })();
  }, [id]);

  return (
    <>
      <MainHeader />
      <StyledActivityOneWrap>
        {detail.detailState === 0 ? (
          <NotStarting />
        ) : detail.detailState === 1 ? (
          <NotFinished />
        ) : (
          <EditWrap />
        )}
      </StyledActivityOneWrap>
    </>
  );
};

const StyledActivityOneWrap = styled.div`
  padding-left: 14.3vw;
  padding-right: 14.3vw;
`;

export default ActivityOneEdit;
