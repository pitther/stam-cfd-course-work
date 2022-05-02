import * as S from './ToolPanel.styled';

const ToolPanel = ({ toolbar }) => {
  const { setToggledToolName, toggledToolName } = toolbar;

  const toggleTool = (name) => {
    setToggledToolName(name);
  };

  return (
    <S.Wrapper>
      <S.Container>
        {toolbar.tools.map(({ title, tools }) => (
          <S.ToolSection key={title}>
            <S.SectionTitle>{title}</S.SectionTitle>
            <S.ToolContainer>
              {tools.map(({ name, icon }) => (
                <S.Tool
                  toggled={toggledToolName === name}
                  key={name}
                  onClick={() => toggleTool(name)}
                >
                  {icon}
                </S.Tool>
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
