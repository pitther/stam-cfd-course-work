import {
  AiFillFolderOpen,
  AiFillSave,
  FaFan,
  FaHandPointer,
  FiWind,
  GiArrowCursor,
  GiBrickWall,
  GiWindow,
} from 'react-icons/all';

import * as S from './ToolPanel.styled';

const ToolPanel = () => {
  console.log('Remove it when reformat will be okay');

  return (
    <S.Wrapper>
      <S.Container>
        <S.ToolSection>
          <S.Tool>
            <AiFillFolderOpen />
          </S.Tool>
          <S.Tool>
            <AiFillSave />
          </S.Tool>
        </S.ToolSection>
        <S.ToolSection>
          <S.Tool>
            <GiArrowCursor />
          </S.Tool>
          <S.Tool>
            <FaHandPointer />
          </S.Tool>
        </S.ToolSection>
        <S.ToolSection>
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
        </S.ToolSection>
      </S.Container>
    </S.Wrapper>
  );
};

ToolPanel.propTypes = {};

export default ToolPanel;
