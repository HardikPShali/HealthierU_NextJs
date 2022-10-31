import styled from 'styled-components';

export const AnswersCardBox = styled.div`
  height: 100%;
  border-radius: 22px;
  padding: 1.25rem;
  color: #fff;
  font-weight: 700 !important;
  font-size: 20px !important;
  text-shadow: 0px 0px 15px #000;
  overflow: auto;
`;

export const MainHeader = styled.h3`
  margin-left: 5px;
  color: #344767;
  font-weight: 700;
  text-shadow: none;
`;

export const AnswersCardHolder = styled.div`
  width: 100%;
`;

export const AnswersCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 22px;
  filter: drop-shadow(0px 9px 12px rgba(0, 0, 0, 0.08));
  padding: 28px 25px 28px 33px;
  margin-top: 20px;
`;

export const AnswersCardDetails = styled.div`
  margin: 12px;
  color: #3e4543;
  background: #efefef;
  padding: 18px;
  border-radius: 10px;
`;

export const AnswersCardQuestionTitle = styled.h6`
  text-shadow: none;
  font-size: 16px;
  font-weight: bold;
`;

export const AnswersCardQuestionAnswer = styled.h6`
  font-size: 15px;
  text-decoration: none;
  text-shadow: none;
  font-weight: 400;
`;
