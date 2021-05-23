const [navKeyList, setNavKeyList] = useState({});
const { globalState, globalDispatch } = useContext(Context);

const handleDrawerOpen = () => {
  setOpen(true);
};

const handleDrawerClose = () => {
  setOpen(false);
};

useEffect(async () => {
  let cateRes = await get("/coupon/getAllCategoryAndSubcat");
  console.log('category-sub---', cateRes.data.content)

  if (cateRes.data.content) {
    var catData = cateRes.data.content
    var data = catData.reduce((prev, t, index, arr) => {
      if (typeof prev[t.category_name] === 'undefined') {
        prev[t.category_name] = [];
      }
      console.log(prev[t])
      prev[t.category_name].push(t);
      return prev;
    }, {});
  }
  setNavKeyList(data)

}, [])


const rendercatAndsubcatDrop = () => {

  const categoryKey = Object.keys(navKeyList)
  return categoryKey && categoryKey.map((cateKey, index) => {
    return <div className={classes.category}>
      <Grid container style={{ width: '35rem' }}>
        <Grid xl={6}>
          <li className={classes.li}>{cateKey} <ArrowRightIcon className={classes.leftarrowicon} /> </li>
        </Grid>

        <Grid xl={6} style={{ backgroundColor: "white", display: "flex" }}>
          <div className={classes.hr}></div>
          <div className={classes.subcategory}>
            {navKeyList && navKeyList[cateKey].map((subcat, ind) => {
              return <li> {subcat.subcategory_name}</li>
            })}
          </div>
        </Grid>
      </Grid>
    </div>
  })
}
