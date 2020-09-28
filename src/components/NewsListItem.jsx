import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: "120ch",
		backgroundColor: theme.palette.background.paper,
	},
	inline: {
		display: "inline",
	},
}));

export default function AlignItemsList({ results, isLoading }) {
	const classes = useStyles();

	return (
		<>
			{isLoading ? (
				<div>Loading results...</div>
			) : (
				<List className={classes.root}>
					{results.map((result) => (
						<div key={result.objectID}>
							<ListItem alignItems="flex-start">
								<ListItemAvatar>
									<Avatar
										alt="Remy Sharp"
										src="/static/images/avatar/1.jpg"
									/>
								</ListItemAvatar>
								<a
									href={result.url}
									style={{
										textDecoration: "none",
										listStyle: "none",
									}}
								>
									<ListItemText
										primary={result.title}
										secondary={
											<React.Fragment>
												<Typography
													component="span"
													variant="body2"
													className={classes.inline}
													color="textPrimary"
												>
													{result.author}
												</Typography>{" "}
												{moment(
													result.created_at
												).format("MM/DD/YYYY h:mm a")}
											</React.Fragment>
										}
										style={{
											textDecoration: "null",
											listStyle: "null",
										}}
									/>
								</a>
							</ListItem>
							<Divider variant="inset" component="li" />
						</div>
					))}
				</List>
			)}
		</>
	);
}
