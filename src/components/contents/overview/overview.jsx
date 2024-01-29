import {
	Container,
	Grid,
	Typography,
	Box,
	Card,
	CardContent,
} from "@mui/material";
import React from "react";

const Overview = () => {
	return (
		<Box sx={{ width: "100%" }}>
			<Typography gutterBottom variant="h5" component="div">
				Welcome back!
			</Typography>
			<Grid container gap={2}>
				<Grid item xs={12} sm={6} md={3}>
					<Card>
						<CardContent sx={{ textAlign: "center" }}>
							<Typography variant="h6" component="div">
								TASKS DONE
							</Typography>
							<Typography variant="h2">2</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<Card>
						<CardContent sx={{ textAlign: "center" }}>
							<Typography variant="h6" component="div">
								INCOMPLETE TASKS
							</Typography>
							<Typography variant="h2">5</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<Card>
						<CardContent sx={{ textAlign: "center" }}>
							<Typography variant="h6" component="div">
								INCOMPLETE TASKS
							</Typography>
							<Typography variant="h2">5</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Overview;
