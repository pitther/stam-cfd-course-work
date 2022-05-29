import axios from 'axios';

const url = 'http://localhost:5000';

const useData = () => {
  const getAllMaps = async () =>
    axios
      .get(`${url}/maps`)
      .then((res) => res.data)
      .catch((err) => err);

  const getMap = async (id) =>
    axios
      .get(`${url}/map`, { params: { id: id.toString() } })
      .then((res) => res.data)
      .catch((err) => err);

  const addMap = async (map) =>
    axios
      .post(`${url}/map`, { params: { map } })
      .then((res) => res)
      .catch((err) => err);

  const updateMap = async (map) =>
    axios
      .put(`${url}/map`, { params: { map } })
      .then((res) => res.data)
      .catch((err) => err);

  return { getAllMaps, getMap, updateMap, addMap };
};

export default useData;
