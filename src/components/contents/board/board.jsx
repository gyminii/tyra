import {
	Box,
	Container,
	Typography,
	Grid,
	Collapse,
	CardContent,
	Card as MuiCard,
	Breadcrumbs,
	IconButton,
	Divider,
	CardHeader,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import Card from "../../card/card";
import { Fullscreen, Schedule, StarBorder } from "@mui/icons-material";
import useGenerateList from "../../../hooks/use-generate-list";
import { useDragAndDrop } from "../../../hooks/use-drag-n-drop";
import { gql, useQuery } from "@apollo/client";

const boards = ["to-do", "in-progress", "in-review", "done"];
//  MUST CONTAIN ID, BOARD FOR BOARD SWAP LOGIC

const Board = () => {
	const GET_TASKS = gql`
		query tasks {
			allTasks {
				title
			}
		}
	`;

	const boardsArr = boards.map((status) => ({
		title: status.toUpperCase().replace("-", " "),
		value: status,
	}));
	const { loading, error, data } = useQuery(GET_TASKS);
	console.log(loading, error, data);

	return (
		<Box sx={{ width: "100%" }}>
			<MuiCard sx={{ marginBottom: 2 }}>
				<CardContent sx={{ gap: 2 }}>
					<Box width="100%" display="inline-flex" alignItems="center">
						<Box flex={1}>
							<Breadcrumbs separator="›" aria-label="breadcrumb">
								<Typography>board</Typography>
								<Typography variant="subtitle1">Tyra Personal</Typography>
							</Breadcrumbs>
						</Box>
						<Box display="inline-flex">
							<Box>
								<IconButton>
									<Schedule fontSize="small" />
								</IconButton>
								<Typography variant="subtitle3">10 Days left</Typography>
							</Box>
							<Divider flexItem orientation="vertical" sx={{ my: 1, px: 1 }} />
							<IconButton>
								<StarBorder fontSize="small" />
							</IconButton>

							<IconButton>
								<Fullscreen fontSize="small" />
							</IconButton>
						</Box>
					</Box>

					<Box mt={2}>
						<CardHeader
							sx={{ p: 0 }}
							title="Tyra Personal"
							subheader="Feel free to add more tasks by clicking on the (+) button for each card."
						/>
					</Box>
				</CardContent>
			</MuiCard>

			<Grid container gap={2} display="inline-flex">
				{boardsArr?.map(({ title, value }, index) => (
					<Grid item key={index}>
						<Card title={title} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default Board;
