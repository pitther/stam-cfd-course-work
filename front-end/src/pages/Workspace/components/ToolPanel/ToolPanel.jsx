import { Tooltip } from 'antd';

import { themeColors } from '../../../../styles/theme';
import { handleToolbarOptions } from '../Canvas/hooks/useCanvas';

import * as S from './ToolPanel.styled';

const ToolPanel = ({ toolbar }) => {
  const { groups, toggle, isToggled } = toolbar;

  const generateOptions = (tabName, options) => {
    if (!options) return tabName;
    return (
      <S.Centrize>
        {tabName}
        <S.OptionContainer>
          {options.map(({ name, icon }) => (
            <S.Tool onClick={() => handleToolbarOptions(name)} key={name}>
              {icon}
            </S.Tool>
          ))}
        </S.OptionContainer>
      </S.Centrize>
    );
  };

  return (
    <S.Wrapper>
      <S.Container>
        {groups.map(({ title, tools }) => (
          <S.ToolSection key={title}>
            <S.SectionTitle>{title}</S.SectionTitle>
            <S.ToolContainer>
              {tools.map(({ name, icon, options }) => (
                <Tooltip
                  color={themeColors.defaultDarker}
                  placement="bottom"
                  title={() => generateOptions(name, options)}
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
