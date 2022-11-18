import styled from 'styled-components';

/* UPCOMING APPOINTMENTS SECTION */
export const ConsultationHistoryCardBox = styled.div`
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

export const CardHolder = styled.div`
  width: 100%;
  margin-top: 20px;
`;

export const ConsultationHistoryCardView = styled.div`
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
`;

export const CardDetails = styled.div`
  padding: 20px;
  margin: 10px;
  color: #3e4543;
  /* filter: drop-shadow(0px 9px 12px rgba(0, 0, 0, 0.08)); */
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 10px;
  filter: drop-shadow(0px 9px 12px rgba(0, 0, 0, 0.08));
`;

export const CardAppointmentStartTime = styled.h3`
  font-size: 20px;
  text-decoration: none;
  text-shadow: none;
  font-weight: 600;
  text-align: left;
  padding-bottom: 20px;
`;

export const CardDetailsHeading = styled.h4`
  font-size: 16px;
  text-decoration: none;
  text-shadow: none;
  font-weight: 600;
`;

export const CardDetailsContent = styled.p`
  font-size: 14px;
  text-decoration: none;
  text-shadow: none;
  font-weight: 400;
  color: #444444;
`;
