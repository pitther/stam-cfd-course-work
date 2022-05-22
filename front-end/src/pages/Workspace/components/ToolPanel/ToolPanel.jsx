import { Tooltip } from 'antd';

import { themeColors } from '../../../../styles/theme';

import * as S from './ToolPanel.styled';

const ToolPanel = ({ toolbar }) => {
  const { groups, toggle, isToggled } = toolbar;

  return (
    <S.Wrapper>
      <S.Container>
        {groups.map(({ title, tools }) => (
          <S.ToolSection key={title}>
            <S.SectionTitle>{title}</S.SectionTitle>
            <S.ToolContainer>
              {tools.map(({ name, icon }) => (
                <Tooltip
                  color={themeColors.defaultDarker}
                  placement="bottom"
                  title={name}
                  key={name}
                >
                  <S.Tool
                    toggled={isToggled(name)}
                    onClick={() => toggle(name)}
                  >
                    {icon}
                  </S.Tool>
                </Tooltip>
              ))}
            </S.ToolContainer>
          </S.ToolSection>
        ))}
      </S.Container>
    </S.Wrapper>
  );
};

ToolPanel.propTypes = {};

export default ToolPanel;
