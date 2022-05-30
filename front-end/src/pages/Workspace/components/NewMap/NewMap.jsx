import { message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useData from '../../../../hooks/UseData';
import { WORKSPACE } from '../../../../routes/paths';

import * as S from './NewMap.styled';

const NewMap = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { addMap } = useData();
  const navigate = useNavigate();
  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onCreate = () => {
    if (name.length < 3 || name.length > 20) {
      message.error('Name`s length must >= 3 and <= 20 symbols');
      return;
    }
    setLoading(true);
    addMap({ resolution: 64, viscosity: 0, diffuse: 0, name })
      .then((res) => {
        if (res.data.response.id) {
          navigate(`${WORKSPACE}/${res.data.response.id}`);
          message.success('Map has been created');
        }
      })
      .catch(() => {
        message.error('Error creating map');
      });
  };

  return (
    <S.Wrapper>
      <S.Container>
        <S.Title>CREATE NEW MAP</S.Title>
        <S.InputContainer>
          <S.InputName
            placeholder="name"
            value={name}
            onChange={onNameChange}
          />
          <S.CreateButton
            disabled={loading}
            type="default"
            block
            onClick={onCreate}
          >
            CREATE
          </S.CreateButton>
        </S.InputContainer>
      </S.Container>
    </S.Wrapper>
  );
};

NewMap.propTypes = {};

export default NewMap;
