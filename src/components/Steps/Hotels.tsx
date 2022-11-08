import { useSelector, useDispatch } from "react-redux";
import { useEffect, ChangeEvent } from "react";
import { Dispatch } from "redux";
// import { makeStyles } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { getAllCountries, getAllHotels } from "../../redux/actions";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";

const Hotels = () => {
  //   const useStyles = makeStyles({
  //     root: {
  //       minWidth: 275,
  //     },
  //     title: {
  //       fontSize: 14,
  //     },
  //     pos: {
  //       marginBottom: 12,
  //     },
  //   });
  //   const classes = useStyles();
  const dispatch = useDispatch<Dispatch<any>>();
  const country: any = useSelector<any>((state) => state.countries);
  const hotel: any = useSelector<any>((state) => state.hotels);

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getAllHotels());
  }, [dispatch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    sessionStorage.setItem("hotelId", e.target.value);
    const hotelfound = hotel.find(
      (h: { id: number }) => h.id === Number(e.target.value)
    );
    
    const countryfound = country.find(
        (c: { id: number }) => c.id === hotelfound.countryId
      );
    sessionStorage.setItem("hotelName", hotelfound.hotelName);
    sessionStorage.setItem("countryId", hotelfound.countryId);
    sessionStorage.setItem("countryName", countryfound.countryName);
  };

  let group = 0;
  let display = true;
  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="hotels"
        name="customized-radios"
        onChange={handleChange}
      >
        {hotel.length
          ? hotel.map(
              (h: { hotelName: string; id: number; countryId: number }) => {
                display = group !== h.countryId;
                group = h.countryId;
                return (
                  <>
                    {display ? (
                      <Typography key={h.countryId}>
                        {
                          country.find(
                            (c: { id: number }) => c.id === h.countryId
                          ).countryName
                        }
                      </Typography>
                    ) : null}
                    <Box
                      key={"h" + h.id}
                      display="flex"
                      flexDirection={"row"}
                      rowGap={10}
                    >
                      <Card key={"cr" + h.id}>
                        <CardMedia
                          component="img"
                          height="140"
                          image="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress"
                          alt="Hotel"
                        />
                        <CardContent>
                          <Radio value={h.id} color="primary" />
                          <Typography color="textSecondary" gutterBottom>
                            {h.hotelName}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Box>
                  </>
                );
              }
            )
          : null}
      </RadioGroup>
    </FormControl>
  );
};

export default Hotels;
