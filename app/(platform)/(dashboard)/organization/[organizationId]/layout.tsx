import OrgControl from './_components/OrgControl';

const OranizationIdLayout=({children}:{children:React.ReactNode})=>{
    return (
        <>
          <OrgControl />
          {children}
        </>
      );

}

export default OranizationIdLayout