import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import { useState } from 'react';
import Header from '../Components/Header';
import { useStyles } from './style';

const imageDropdown ='/images/newLanding/icon-down.svg';
const imageDropUp ='/images/newLanding/icon-up.svg';
const listFaq: CustomizedAccordionProps[] = [
  {
    question: 'Where can I purchase XBorg NFTs?',
    answer: 'You will be able to mint directly from our website.',
  },
  {
    question: 'How many NFTs will be available, when is the mint date and what is the price?',
    answer: `Xborg genesis is a collection of total 2500 NFTs, 1000 will be available for minting on the 1st of June 2022 at 0.08E for pre-sale and 0.095E for public sale.`,
  },
  {
    question: 'How are XBorg NFTs created?',
    answer: 'They are hand drawn by our artist Netina Beukes and the artwork will be minted on Ethereum blockchain.',
  },
  {
    question: 'Which wallets are compatible for minting our NFTs?',
    answer: 'We offer several ERC-20 wallets, but the most recommended is metamask.',
  },
  {
    question: 'What are the benefits of holding XBorg NFTs?',
    answer: 'Access to IDOs/IGOs, Yield box token earnings, Dao access, Gaming project perks etc.',
  },
  {
    question: 'What is an IDO/IGO?',
    answer:
      'Initial Decentralized Offering (IDO) and Initial Game Offering (IGO) are crypto fundraising models for the projects launched on VISPX’s XPAD.',
  },
  {
    question: 'What is a Yield Box?',
    answer:
      'A Yield Box is a simple token generator, it acts as a staking pool to offer passive income to the holders in $VXP tokens and partner project tokens for XBorg holders.',
  },
  {
    question: 'What is DAO access and how does it benefit XBorg holders?',
    answer:
      'Here holders can exercise their voting rights for various activities including vetting processes for incubated projects, community events, ecosystem economy etc.',
  },
  {
    question: 'Will the IDO/IGO staking and yield box staking lead to a decrease in the number of holders?',
    answer:
      'No, both staking functions simply update your “staked token attribute”. In other words, it is non-custodial (no need to transfer it to another contract) and the holder numbers displayed on OpenSea or any secondary market will not be impacted.',
  },
  {
    question: 'Are there other benefits to staking my XBorg NFTs?',
    answer:
      'When an XBorg is staked, it cannot be stolen using some of the more common phishing techniques we have seen recently, all of which rely on the standard ERC721 transfer functions.',
  },
];

const Section8 = () => {
  const classes = useStyles();
  return (
    <section className={classes.container}>
      <Header content="Frequently asked questions" />
      <div className={classes.accordionField}>
        {listFaq.map((element, index) => {
          return (
            <div key={index} className={classes.accordionItem}>
              <CustomizedAccordion {...element} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

interface CustomizedAccordionProps {
  question: string;
  answer: string;
}
const DropdownIcon = ()=>{
  return (
    <img style={{width:'18px'}} src={imageDropdown} alt='' />
  )
}

const UPIcon = ()=>{
  return (
    <img style={{width:'18px'}} src={imageDropUp} alt='' />
  )
}

const CustomizedAccordion = (props: CustomizedAccordionProps) => {
  const [expanded, setExpanded] = useState(true);
  const classes = useStyles();
  const { question, answer } = props;
  return (
    <Accordion className={classes.accordion}>
      <AccordionSummary expandIcon={expanded ? <DropdownIcon /> : <UPIcon />}
        onClick={(event) => {
          setExpanded(expanded);
        }}
      >
        <p>{question}</p>
      </AccordionSummary>
      <AccordionDetails>
        <p>{answer}</p>
      </AccordionDetails>
    </Accordion>
  );
};

export default Section8;
