import {
  AiFillFolderOpen,
  AiFillSave,
  FaEraser,
  FaFan,
  FaHandPointer,
  FiWind,
  GiArrowCursor,
  GiBrickWall,
  GiWindow,
  MdNotStarted,
  MdStopCircle,
} from 'react-icons/all';

import { themeColors } from '../../../../styles/theme';

import * as S from './ToolPanel.styled';

const ToolPanel = () => {
  console.log('Remove it when reformat will be okay');

  return (
    <S.Wrapper>
      <S.Container>
        <S.ToolSection>
          <S.SectionTitle>MANAGE</S.SectionTitle>
          <S.ToolContainer>
            <S.Tool>
              <AiFillFolderOpen />
            </S.Tool>
            <S.Tool>
              <AiFillSave />
            </S.Tool>
          </S.ToolContainer>
        </S.ToolSection>
        <S.ToolSection>
          <S.SectionTitle>CURSOR</S.SectionTitle>
          <S.ToolContainer>
            <S.Tool>
              <GiArrowCursor />
            </S.Tool>
            <S.Tool>
              <FaHandPointer />
            </S.Tool>
            <S.Tool>
              <FaEraser />
            </S.Tool>
          </S.ToolContainer>
        </S.ToolSection>
        <S.ToolSection>
          <S.SectionTitle>BUILD</S.SectionTitle>
          <S.ToolContainer>
            <S.Tool>
              <GiBrickWall />
            </S.Tool>
            <S.Tool>
              <GiWindow />
            </S.Tool>
            <S.Tool>
              <FaFan />
            </S.Tool>
            <S.Tool>
              <FiWind />
            </S.Tool>
          </S.ToolContainer>
        </S.ToolSection>
        <S.ToolSection>
          <S.SectionTitle>SIMULATION</S.SectionTitle>
          <S.ToolContainer>
            <S.Tool color={themeColors.red}>
              <MdStopCircle />
            </S.Tool>
            <S.Tool color={themeColors.accent}>
              <MdNotStarted />
            </S.Tool>
          </S.ToolContainer>
        </S.ToolSection>
      </S.Container>
    </S.Wrapper>
  );
};

ToolPanel.propTypes = {};

export default ToolPanel;
