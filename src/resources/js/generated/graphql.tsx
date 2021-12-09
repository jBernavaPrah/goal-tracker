import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string with format `Y-m-d`, e.g. `2011-05-23`. */
  Date: any;
  /** A datetime string with format `Y-m-d H:i:sZ`, e.g. `2021-12-06T15:05:50.870Z`. */
  DateTime: any;
  /**
   * Loose type that allows any value. Be careful when passing in large `Int` or `Float` literals,
   * as they may not be parsed correctly on the server side. Use `String` literals if you are
   * dealing with really large numbers to be on the safe side.
   */
  Mixed: any;
};

export type CreateGameInput = {
  playedAt: Scalars['DateTime'];
  team1: Scalars['ID'];
  team2: Scalars['ID'];
};

export type CreateGoalInput = {
  game: Scalars['ID'];
  player: Scalars['ID'];
};

export type CreatePlayerInput = {
  name: Scalars['String'];
  team: Scalars['ID'];
};

export type CreateTeamInput = {
  name: Scalars['String'];
};

export type Game = Model & {
  __typename?: 'Game';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  goals?: Maybe<GoalPaginator>;
  id: Scalars['ID'];
  playedAt: Scalars['DateTime'];
  team1: Team;
  team2: Team;
  totalGoalsTeam1: Scalars['Int'];
  totalGoalsTeam2: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};


export type GameGoalsArgs = {
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};

/** A paginated list of Game items. */
export type GamePaginator = {
  __typename?: 'GamePaginator';
  /** A list of Game items. */
  data: Array<Game>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type Goal = Model & {
  __typename?: 'Goal';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  game: Game;
  id: Scalars['ID'];
  player: Player;
  updatedAt: Scalars['DateTime'];
};

/** A paginated list of Goal items. */
export type GoalPaginator = {
  __typename?: 'GoalPaginator';
  /** A list of Goal items. */
  data: Array<Goal>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type Model = {
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createGame: Game;
  createGoal: Goal;
  createPlayer: Player;
  createTeam: Team;
  deleteGame: Game;
  deleteGoal: Goal;
  deletePlayer: Player;
  deleteTeam: Team;
  updateGame: Game;
  updatePlayer: Player;
  updateTeam: Team;
};


export type MutationCreateGameArgs = {
  input: CreateGameInput;
};


export type MutationCreateGoalArgs = {
  input: CreateGoalInput;
};


export type MutationCreatePlayerArgs = {
  input: CreatePlayerInput;
};


export type MutationCreateTeamArgs = {
  input: CreateTeamInput;
};


export type MutationDeleteGameArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteGoalArgs = {
  id: Scalars['ID'];
};


export type MutationDeletePlayerArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteTeamArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateGameArgs = {
  input: UpdateGameInput;
};


export type MutationUpdatePlayerArgs = {
  input: UpdatePlayerInput;
};


export type MutationUpdateTeamArgs = {
  input: UpdateTeamInput;
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Information about pagination using a Relay style cursor connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Number of nodes in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** The cursor to continue paginating forwards. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** Index of the last available page. */
  lastPage: Scalars['Int'];
  /** The cursor to continue paginating backwards. */
  startCursor?: Maybe<Scalars['String']>;
  /** Total number of nodes in the paginated connection. */
  total: Scalars['Int'];
};

/** Information about pagination using a fully featured paginator. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']>;
  /** Index of the last available page. */
  lastPage: Scalars['Int'];
  /** Number of items per page. */
  perPage: Scalars['Int'];
  /** Number of total available items. */
  total: Scalars['Int'];
};

export type Player = Model & {
  __typename?: 'Player';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  goals?: Maybe<GoalPaginator>;
  id: Scalars['ID'];
  name: Scalars['String'];
  team: Team;
  updatedAt: Scalars['DateTime'];
};


export type PlayerGoalsArgs = {
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};

/** A paginated list of Player items. */
export type PlayerPaginator = {
  __typename?: 'PlayerPaginator';
  /** A list of Player items. */
  data: Array<Player>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type Query = {
  __typename?: 'Query';
  game?: Maybe<Game>;
  games?: Maybe<GamePaginator>;
  goals: Array<Goal>;
  player?: Maybe<Player>;
  players?: Maybe<PlayerPaginator>;
  statistics: Array<Statistics>;
  team?: Maybe<Team>;
  teams?: Maybe<TeamPaginator>;
};


export type QueryGameArgs = {
  id: Scalars['ID'];
};


export type QueryGamesArgs = {
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryGoalsArgs = {
  game: Scalars['ID'];
  player?: Maybe<Scalars['ID']>;
  team: Scalars['ID'];
};


export type QueryPlayerArgs = {
  id: Scalars['ID'];
};


export type QueryPlayersArgs = {
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  team?: Maybe<Scalars['ID']>;
};


export type QueryTeamArgs = {
  id: Scalars['ID'];
};


export type QueryTeamsArgs = {
  first?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  withPlayers?: Maybe<Scalars['Boolean']>;
};

/** The available SQL operators that are used to filter query results. */
export enum SqlOperator {
  /** Whether a value is within a range of values (`BETWEEN`) */
  Between = 'BETWEEN',
  /** Equal operator (`=`) */
  Eq = 'EQ',
  /** Greater than operator (`>`) */
  Gt = 'GT',
  /** Greater than or equal operator (`>=`) */
  Gte = 'GTE',
  /** Whether a value is within a set of values (`IN`) */
  In = 'IN',
  /** Whether a value is not null (`IS NOT NULL`) */
  IsNotNull = 'IS_NOT_NULL',
  /** Whether a value is null (`IS NULL`) */
  IsNull = 'IS_NULL',
  /** Simple pattern matching (`LIKE`) */
  Like = 'LIKE',
  /** Less than operator (`<`) */
  Lt = 'LT',
  /** Less than or equal operator (`<=`) */
  Lte = 'LTE',
  /** Not equal operator (`!=`) */
  Neq = 'NEQ',
  /** Whether a value is not within a range of values (`NOT BETWEEN`) */
  NotBetween = 'NOT_BETWEEN',
  /** Whether a value is not within a set of values (`NOT IN`) */
  NotIn = 'NOT_IN',
  /** Negation of simple pattern matching (`NOT LIKE`) */
  NotLike = 'NOT_LIKE'
}

/** Information about pagination using a simple paginator. */
export type SimplePaginatorInfo = {
  __typename?: 'SimplePaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']>;
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']>;
  /** Number of items per page. */
  perPage: Scalars['Int'];
};

/** The available directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

export type Statistics = {
  __typename?: 'Statistics';
  /** Goals Difference */
  goalDifference: Scalars['Int'];
  /** Goals Against */
  goalsAgainst: Scalars['Int'];
  /** Goals For */
  goalsFor: Scalars['Int'];
  losses: Scalars['Int'];
  name: Scalars['String'];
  /** Games Played/Win */
  ratio: Scalars['Float'];
  wins: Scalars['Int'];
};

export type Team = Model & {
  __typename?: 'Team';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  gameTeam1?: Maybe<GamePaginator>;
  gameTeam2?: Maybe<GamePaginator>;
  id: Scalars['ID'];
  name: Scalars['String'];
  players?: Maybe<PlayerPaginator>;
  updatedAt: Scalars['DateTime'];
};


export type TeamGameTeam1Args = {
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type TeamGameTeam2Args = {
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type TeamPlayersArgs = {
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};

/** A paginated list of Team items. */
export type TeamPaginator = {
  __typename?: 'TeamPaginator';
  /** A list of Team items. */
  data: Array<Team>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

export type UpdateGameInput = {
  id: Scalars['ID'];
  playedAt?: Maybe<Scalars['DateTime']>;
  team1?: Maybe<Scalars['ID']>;
  team2?: Maybe<Scalars['ID']>;
};

export type UpdatePlayerInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  team?: Maybe<Scalars['ID']>;
};

export type UpdateTeamInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

/** Dynamic WHERE conditions for queries. */
export type WhereConditions = {
  /** A set of conditions that requires all conditions to match. */
  AND?: Maybe<Array<WhereConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: Maybe<WhereConditionsRelation>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: Maybe<Array<WhereConditions>>;
  /** The column that is used for the condition. */
  column?: Maybe<Scalars['String']>;
  /** The operator that is used for the condition. */
  operator?: Maybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: Maybe<Scalars['Mixed']>;
};

/** Dynamic HAS conditions for WHERE condition queries. */
export type WhereConditionsRelation = {
  /** The amount to test. */
  amount?: Maybe<Scalars['Int']>;
  /** Additional condition logic. */
  condition?: Maybe<WhereConditions>;
  /** The comparison operator to test against the amount. */
  operator?: Maybe<SqlOperator>;
  /** The relation that is checked. */
  relation: Scalars['String'];
};

export type PaginatorInfoFieldsFragment = { __typename?: 'PaginatorInfo', total: number, currentPage: number, hasMorePages: boolean, perPage: number };

export type StatisticsQueryVariables = Exact<{ [key: string]: never; }>;


export type StatisticsQuery = { __typename?: 'Query', statistics: Array<{ __typename?: 'Statistics', goalDifference: number, goalsAgainst: number, goalsFor: number, wins: number, losses: number, ratio: number, name: string }> };

export type ListGamesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListGamesQuery = { __typename?: 'Query', games?: { __typename?: 'GamePaginator', data: Array<{ __typename?: 'Game', id: string, totalGoalsTeam1: number, totalGoalsTeam2: number, playedAt: any, createdAt: any, team1: { __typename?: 'Team', id: string, name: string }, team2: { __typename?: 'Team', id: string, name: string } }>, paginatorInfo: { __typename?: 'PaginatorInfo', total: number, currentPage: number, hasMorePages: boolean, perPage: number } } | null | undefined };

export type GameDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GameDetailsQuery = { __typename?: 'Query', game?: { __typename?: 'Game', id: string, totalGoalsTeam1: number, totalGoalsTeam2: number, playedAt: any, createdAt: any, team1: { __typename?: 'Team', id: string, name: string }, team2: { __typename?: 'Team', id: string, name: string } } | null | undefined };

export type CreateGameMutationVariables = Exact<{
  team1: Scalars['ID'];
  team2: Scalars['ID'];
  playedAt: Scalars['DateTime'];
}>;


export type CreateGameMutation = { __typename?: 'Mutation', createGame: { __typename?: 'Game', id: string, totalGoalsTeam1: number, totalGoalsTeam2: number, playedAt: any, createdAt: any, team1: { __typename?: 'Team', id: string, name: string }, team2: { __typename?: 'Team', id: string, name: string } } };

export type UpdateGameMutationVariables = Exact<{
  id: Scalars['ID'];
  team1?: Maybe<Scalars['ID']>;
  team2?: Maybe<Scalars['ID']>;
  playedAt?: Maybe<Scalars['DateTime']>;
}>;


export type UpdateGameMutation = { __typename?: 'Mutation', updateGame: { __typename?: 'Game', id: string, totalGoalsTeam1: number, totalGoalsTeam2: number, playedAt: any, createdAt: any, team1: { __typename?: 'Team', id: string, name: string }, team2: { __typename?: 'Team', id: string, name: string } } };

export type GameFieldsFragment = { __typename?: 'Game', id: string, totalGoalsTeam1: number, totalGoalsTeam2: number, playedAt: any, createdAt: any, team1: { __typename?: 'Team', id: string, name: string }, team2: { __typename?: 'Team', id: string, name: string } };

export type CreateGoalMutationVariables = Exact<{
  player: Scalars['ID'];
  game: Scalars['ID'];
}>;


export type CreateGoalMutation = { __typename?: 'Mutation', createGoal: { __typename?: 'Goal', id: string, createdAt: any, game: { __typename?: 'Game', id: string, totalGoalsTeam1: number, totalGoalsTeam2: number, playedAt: any, createdAt: any, team1: { __typename?: 'Team', id: string, name: string }, team2: { __typename?: 'Team', id: string, name: string } }, player: { __typename?: 'Player', id: string, name: string, updatedAt: any, team: { __typename?: 'Team', id: string, name: string }, goals?: { __typename?: 'GoalPaginator', data: Array<{ __typename?: 'Goal', id: string, game: { __typename?: 'Game', id: string, totalGoalsTeam1: number, totalGoalsTeam2: number } }>, paginatorInfo: { __typename?: 'PaginatorInfo', total: number } } | null | undefined } } };

export type DeleteGoalMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteGoalMutation = { __typename?: 'Mutation', deleteGoal: { __typename?: 'Goal', id: string, createdAt: any, game: { __typename?: 'Game', id: string, totalGoalsTeam1: number, totalGoalsTeam2: number, playedAt: any, createdAt: any, team1: { __typename?: 'Team', id: string, name: string }, team2: { __typename?: 'Team', id: string, name: string } }, player: { __typename?: 'Player', id: string, name: string, updatedAt: any, team: { __typename?: 'Team', id: string, name: string }, goals?: { __typename?: 'GoalPaginator', data: Array<{ __typename?: 'Goal', id: string, game: { __typename?: 'Game', id: string, totalGoalsTeam1: number, totalGoalsTeam2: number } }>, paginatorInfo: { __typename?: 'PaginatorInfo', total: number } } | null | undefined } } };

export type ListGoalsByGameAndTeamQueryVariables = Exact<{
  game: Scalars['ID'];
  team: Scalars['ID'];
}>;


export type ListGoalsByGameAndTeamQuery = { __typename?: 'Query', goals: Array<{ __typename?: 'Goal', id: string, createdAt: any, game: { __typename?: 'Game', id: string, totalGoalsTeam1: number, totalGoalsTeam2: number, playedAt: any, createdAt: any, team1: { __typename?: 'Team', id: string, name: string }, team2: { __typename?: 'Team', id: string, name: string } }, player: { __typename?: 'Player', id: string, name: string, updatedAt: any, team: { __typename?: 'Team', id: string, name: string }, goals?: { __typename?: 'GoalPaginator', data: Array<{ __typename?: 'Goal', id: string, game: { __typename?: 'Game', id: string, totalGoalsTeam1: number, totalGoalsTeam2: number } }>, paginatorInfo: { __typename?: 'PaginatorInfo', total: number } } | null | undefined } }> };

export type GoalFieldsFragment = { __typename?: 'Goal', id: string, createdAt: any, game: { __typename?: 'Game', id: string, totalGoalsTeam1: number, totalGoalsTeam2: number, playedAt: any, createdAt: any, team1: { __typename?: 'Team', id: string, name: string }, team2: { __typename?: 'Team', id: string, name: string } }, player: { __typename?: 'Player', id: string, name: string, updatedAt: any, team: { __typename?: 'Team', id: string, name: string }, goals?: { __typename?: 'GoalPaginator', data: Array<{ __typename?: 'Goal', id: string, game: { __typename?: 'Game', id: string, totalGoalsTeam1: number, totalGoalsTeam2: number } }>, paginatorInfo: { __typename?: 'PaginatorInfo', total: number } } | null | undefined } };

export type CreatePlayerMutationVariables = Exact<{
  name: Scalars['String'];
  team: Scalars['ID'];
}>;


export type CreatePlayerMutation = { __typename?: 'Mutation', createPlayer: { __typename?: 'Player', id: string, name: string, updatedAt: any, team: { __typename?: 'Team', id: string, name: string }, goals?: { __typename?: 'GoalPaginator', data: Array<{ __typename?: 'Goal', id: string, game: { __typename?: 'Game', id: string, totalGoalsTeam1: number, totalGoalsTeam2: number } }>, paginatorInfo: { __typename?: 'PaginatorInfo', total: number } } | null | undefined } };

export type UpdatePlayerNameMutationVariables = Exact<{
  id: Scalars['ID'];
  name: Scalars['String'];
}>;


export type UpdatePlayerNameMutation = { __typename?: 'Mutation', updatePlayer: { __typename?: 'Player', id: string, name: string, updatedAt: any, team: { __typename?: 'Team', id: string, name: string }, goals?: { __typename?: 'GoalPaginator', data: Array<{ __typename?: 'Goal', id: string, game: { __typename?: 'Game', id: string, totalGoalsTeam1: number, totalGoalsTeam2: number } }>, paginatorInfo: { __typename?: 'PaginatorInfo', total: number } } | null | undefined } };

export type DeletePlayerMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePlayerMutation = { __typename?: 'Mutation', deletePlayer: { __typename?: 'Player', id: string } };

export type ListPlayersByTeamQueryVariables = Exact<{
  team: Scalars['ID'];
}>;


export type ListPlayersByTeamQuery = { __typename?: 'Query', players?: { __typename?: 'PlayerPaginator', data: Array<{ __typename?: 'Player', id: string, name: string, updatedAt: any, team: { __typename?: 'Team', id: string, name: string }, goals?: { __typename?: 'GoalPaginator', data: Array<{ __typename?: 'Goal', id: string, game: { __typename?: 'Game', id: string, totalGoalsTeam1: number, totalGoalsTeam2: number } }>, paginatorInfo: { __typename?: 'PaginatorInfo', total: number } } | null | undefined }>, paginatorInfo: { __typename?: 'PaginatorInfo', total: number, currentPage: number, hasMorePages: boolean, perPage: number } } | null | undefined };

export type PlayerCardQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PlayerCardQuery = { __typename?: 'Query', player?: { __typename?: 'Player', id: string, name: string, updatedAt: any, team: { __typename?: 'Team', id: string, name: string }, goals?: { __typename?: 'GoalPaginator', data: Array<{ __typename?: 'Goal', id: string, game: { __typename?: 'Game', id: string, totalGoalsTeam1: number, totalGoalsTeam2: number } }>, paginatorInfo: { __typename?: 'PaginatorInfo', total: number } } | null | undefined } | null | undefined };

export type PlayerFieldsFragment = { __typename?: 'Player', id: string, name: string, updatedAt: any, team: { __typename?: 'Team', id: string, name: string }, goals?: { __typename?: 'GoalPaginator', data: Array<{ __typename?: 'Goal', id: string, game: { __typename?: 'Game', id: string, totalGoalsTeam1: number, totalGoalsTeam2: number } }>, paginatorInfo: { __typename?: 'PaginatorInfo', total: number } } | null | undefined };

export type ListTeamsQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  withPlayers?: Maybe<Scalars['Boolean']>;
}>;


export type ListTeamsQuery = { __typename?: 'Query', teams?: { __typename?: 'TeamPaginator', data: Array<{ __typename?: 'Team', id: string, name: string, updatedAt: any, createdAt: any, players?: { __typename?: 'PlayerPaginator', data: Array<{ __typename?: 'Player', id: string, name: string, createdAt: any }>, paginatorInfo: { __typename?: 'PaginatorInfo', total: number, currentPage: number, hasMorePages: boolean, perPage: number } } | null | undefined }>, paginatorInfo: { __typename?: 'PaginatorInfo', total: number, currentPage: number, hasMorePages: boolean, perPage: number } } | null | undefined };

export type SearchAutocompleteTeamsQueryVariables = Exact<{
  name?: Maybe<Scalars['String']>;
  withPlayers?: Maybe<Scalars['Boolean']>;
}>;


export type SearchAutocompleteTeamsQuery = { __typename?: 'Query', teams?: { __typename?: 'TeamPaginator', data: Array<{ __typename?: 'Team', id: string, name: string, updatedAt: any, createdAt: any, players?: { __typename?: 'PlayerPaginator', data: Array<{ __typename?: 'Player', id: string, name: string, createdAt: any }>, paginatorInfo: { __typename?: 'PaginatorInfo', total: number, currentPage: number, hasMorePages: boolean, perPage: number } } | null | undefined }> } | null | undefined };

export type TeamDetailQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TeamDetailQuery = { __typename?: 'Query', team?: { __typename?: 'Team', id: string, name: string, updatedAt: any, createdAt: any, players?: { __typename?: 'PlayerPaginator', data: Array<{ __typename?: 'Player', id: string, name: string, createdAt: any }>, paginatorInfo: { __typename?: 'PaginatorInfo', total: number, currentPage: number, hasMorePages: boolean, perPage: number } } | null | undefined } | null | undefined };

export type TeamCardQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TeamCardQuery = { __typename?: 'Query', team?: { __typename?: 'Team', id: string, name: string, updatedAt: any, createdAt: any, players?: { __typename?: 'PlayerPaginator', data: Array<{ __typename?: 'Player', id: string, name: string, createdAt: any }>, paginatorInfo: { __typename?: 'PaginatorInfo', total: number, currentPage: number, hasMorePages: boolean, perPage: number } } | null | undefined } | null | undefined };

export type UpdateTeamMutationVariables = Exact<{
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
}>;


export type UpdateTeamMutation = { __typename?: 'Mutation', updateTeam: { __typename?: 'Team', id: string, name: string, updatedAt: any, createdAt: any, players?: { __typename?: 'PlayerPaginator', data: Array<{ __typename?: 'Player', id: string, name: string, createdAt: any }>, paginatorInfo: { __typename?: 'PaginatorInfo', total: number, currentPage: number, hasMorePages: boolean, perPage: number } } | null | undefined } };

export type CreateTeamMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam: { __typename?: 'Team', id: string, name: string, updatedAt: any, createdAt: any, players?: { __typename?: 'PlayerPaginator', data: Array<{ __typename?: 'Player', id: string, name: string, createdAt: any }>, paginatorInfo: { __typename?: 'PaginatorInfo', total: number, currentPage: number, hasMorePages: boolean, perPage: number } } | null | undefined } };

export type DeleteTeamMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTeamMutation = { __typename?: 'Mutation', deleteTeam: { __typename?: 'Team', id: string } };

export type TeamFieldsFragment = { __typename?: 'Team', id: string, name: string, updatedAt: any, createdAt: any, players?: { __typename?: 'PlayerPaginator', data: Array<{ __typename?: 'Player', id: string, name: string, createdAt: any }>, paginatorInfo: { __typename?: 'PaginatorInfo', total: number, currentPage: number, hasMorePages: boolean, perPage: number } } | null | undefined };

export const GameFieldsFragmentDoc = gql`
    fragment GameFields on Game {
  id
  team1 {
    id
    name
  }
  team2 {
    id
    name
  }
  totalGoalsTeam1
  totalGoalsTeam2
  playedAt
  createdAt
}
    `;
export const PlayerFieldsFragmentDoc = gql`
    fragment PlayerFields on Player {
  id
  name
  updatedAt
  team {
    id
    name
  }
  goals {
    data {
      id
      game {
        id
        totalGoalsTeam1
        totalGoalsTeam2
      }
    }
    paginatorInfo {
      total
    }
  }
}
    `;
export const GoalFieldsFragmentDoc = gql`
    fragment GoalFields on Goal {
  id
  game {
    ...GameFields
  }
  player {
    ...PlayerFields
  }
  createdAt
}
    ${GameFieldsFragmentDoc}
${PlayerFieldsFragmentDoc}`;
export const PaginatorInfoFieldsFragmentDoc = gql`
    fragment PaginatorInfoFields on PaginatorInfo {
  total
  currentPage
  hasMorePages
  perPage
}
    `;
export const TeamFieldsFragmentDoc = gql`
    fragment TeamFields on Team {
  id
  name
  players {
    data {
      id
      name
      createdAt
    }
    paginatorInfo {
      ...PaginatorInfoFields
    }
  }
  updatedAt
  createdAt
}
    ${PaginatorInfoFieldsFragmentDoc}`;
export const StatisticsDocument = gql`
    query Statistics {
  statistics {
    goalDifference
    goalsAgainst
    goalsFor
    wins
    losses
    ratio
    name
  }
}
    `;

/**
 * __useStatisticsQuery__
 *
 * To run a query within a React component, call `useStatisticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStatisticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStatisticsQuery({
 *   variables: {
 *   },
 * });
 */
export function useStatisticsQuery(baseOptions?: Apollo.QueryHookOptions<StatisticsQuery, StatisticsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StatisticsQuery, StatisticsQueryVariables>(StatisticsDocument, options);
      }
export function useStatisticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StatisticsQuery, StatisticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StatisticsQuery, StatisticsQueryVariables>(StatisticsDocument, options);
        }
export type StatisticsQueryHookResult = ReturnType<typeof useStatisticsQuery>;
export type StatisticsLazyQueryHookResult = ReturnType<typeof useStatisticsLazyQuery>;
export type StatisticsQueryResult = Apollo.QueryResult<StatisticsQuery, StatisticsQueryVariables>;
export const ListGamesDocument = gql`
    query listGames {
  games {
    data {
      ...GameFields
    }
    paginatorInfo {
      ...PaginatorInfoFields
    }
  }
}
    ${GameFieldsFragmentDoc}
${PaginatorInfoFieldsFragmentDoc}`;

/**
 * __useListGamesQuery__
 *
 * To run a query within a React component, call `useListGamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListGamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListGamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useListGamesQuery(baseOptions?: Apollo.QueryHookOptions<ListGamesQuery, ListGamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListGamesQuery, ListGamesQueryVariables>(ListGamesDocument, options);
      }
export function useListGamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListGamesQuery, ListGamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListGamesQuery, ListGamesQueryVariables>(ListGamesDocument, options);
        }
export type ListGamesQueryHookResult = ReturnType<typeof useListGamesQuery>;
export type ListGamesLazyQueryHookResult = ReturnType<typeof useListGamesLazyQuery>;
export type ListGamesQueryResult = Apollo.QueryResult<ListGamesQuery, ListGamesQueryVariables>;
export const GameDetailsDocument = gql`
    query gameDetails($id: ID!) {
  game(id: $id) {
    ...GameFields
  }
}
    ${GameFieldsFragmentDoc}`;

/**
 * __useGameDetailsQuery__
 *
 * To run a query within a React component, call `useGameDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGameDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGameDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGameDetailsQuery(baseOptions: Apollo.QueryHookOptions<GameDetailsQuery, GameDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GameDetailsQuery, GameDetailsQueryVariables>(GameDetailsDocument, options);
      }
export function useGameDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GameDetailsQuery, GameDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GameDetailsQuery, GameDetailsQueryVariables>(GameDetailsDocument, options);
        }
export type GameDetailsQueryHookResult = ReturnType<typeof useGameDetailsQuery>;
export type GameDetailsLazyQueryHookResult = ReturnType<typeof useGameDetailsLazyQuery>;
export type GameDetailsQueryResult = Apollo.QueryResult<GameDetailsQuery, GameDetailsQueryVariables>;
export const CreateGameDocument = gql`
    mutation createGame($team1: ID!, $team2: ID!, $playedAt: DateTime!) {
  createGame(input: {team1: $team1, team2: $team2, playedAt: $playedAt}) {
    ...GameFields
  }
}
    ${GameFieldsFragmentDoc}`;
export type CreateGameMutationFn = Apollo.MutationFunction<CreateGameMutation, CreateGameMutationVariables>;

/**
 * __useCreateGameMutation__
 *
 * To run a mutation, you first call `useCreateGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGameMutation, { data, loading, error }] = useCreateGameMutation({
 *   variables: {
 *      team1: // value for 'team1'
 *      team2: // value for 'team2'
 *      playedAt: // value for 'playedAt'
 *   },
 * });
 */
export function useCreateGameMutation(baseOptions?: Apollo.MutationHookOptions<CreateGameMutation, CreateGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGameMutation, CreateGameMutationVariables>(CreateGameDocument, options);
      }
export type CreateGameMutationHookResult = ReturnType<typeof useCreateGameMutation>;
export type CreateGameMutationResult = Apollo.MutationResult<CreateGameMutation>;
export type CreateGameMutationOptions = Apollo.BaseMutationOptions<CreateGameMutation, CreateGameMutationVariables>;
export const UpdateGameDocument = gql`
    mutation updateGame($id: ID!, $team1: ID, $team2: ID, $playedAt: DateTime) {
  updateGame(input: {id: $id, team1: $team1, team2: $team2, playedAt: $playedAt}) {
    ...GameFields
  }
}
    ${GameFieldsFragmentDoc}`;
export type UpdateGameMutationFn = Apollo.MutationFunction<UpdateGameMutation, UpdateGameMutationVariables>;

/**
 * __useUpdateGameMutation__
 *
 * To run a mutation, you first call `useUpdateGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGameMutation, { data, loading, error }] = useUpdateGameMutation({
 *   variables: {
 *      id: // value for 'id'
 *      team1: // value for 'team1'
 *      team2: // value for 'team2'
 *      playedAt: // value for 'playedAt'
 *   },
 * });
 */
export function useUpdateGameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGameMutation, UpdateGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGameMutation, UpdateGameMutationVariables>(UpdateGameDocument, options);
      }
export type UpdateGameMutationHookResult = ReturnType<typeof useUpdateGameMutation>;
export type UpdateGameMutationResult = Apollo.MutationResult<UpdateGameMutation>;
export type UpdateGameMutationOptions = Apollo.BaseMutationOptions<UpdateGameMutation, UpdateGameMutationVariables>;
export const CreateGoalDocument = gql`
    mutation createGoal($player: ID!, $game: ID!) {
  createGoal(input: {player: $player, game: $game}) {
    ...GoalFields
  }
}
    ${GoalFieldsFragmentDoc}`;
export type CreateGoalMutationFn = Apollo.MutationFunction<CreateGoalMutation, CreateGoalMutationVariables>;

/**
 * __useCreateGoalMutation__
 *
 * To run a mutation, you first call `useCreateGoalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGoalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGoalMutation, { data, loading, error }] = useCreateGoalMutation({
 *   variables: {
 *      player: // value for 'player'
 *      game: // value for 'game'
 *   },
 * });
 */
export function useCreateGoalMutation(baseOptions?: Apollo.MutationHookOptions<CreateGoalMutation, CreateGoalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGoalMutation, CreateGoalMutationVariables>(CreateGoalDocument, options);
      }
export type CreateGoalMutationHookResult = ReturnType<typeof useCreateGoalMutation>;
export type CreateGoalMutationResult = Apollo.MutationResult<CreateGoalMutation>;
export type CreateGoalMutationOptions = Apollo.BaseMutationOptions<CreateGoalMutation, CreateGoalMutationVariables>;
export const DeleteGoalDocument = gql`
    mutation deleteGoal($id: ID!) {
  deleteGoal(id: $id) {
    ...GoalFields
  }
}
    ${GoalFieldsFragmentDoc}`;
export type DeleteGoalMutationFn = Apollo.MutationFunction<DeleteGoalMutation, DeleteGoalMutationVariables>;

/**
 * __useDeleteGoalMutation__
 *
 * To run a mutation, you first call `useDeleteGoalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGoalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGoalMutation, { data, loading, error }] = useDeleteGoalMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteGoalMutation(baseOptions?: Apollo.MutationHookOptions<DeleteGoalMutation, DeleteGoalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteGoalMutation, DeleteGoalMutationVariables>(DeleteGoalDocument, options);
      }
export type DeleteGoalMutationHookResult = ReturnType<typeof useDeleteGoalMutation>;
export type DeleteGoalMutationResult = Apollo.MutationResult<DeleteGoalMutation>;
export type DeleteGoalMutationOptions = Apollo.BaseMutationOptions<DeleteGoalMutation, DeleteGoalMutationVariables>;
export const ListGoalsByGameAndTeamDocument = gql`
    query listGoalsByGameAndTeam($game: ID!, $team: ID!) {
  goals(game: $game, team: $team) {
    ...GoalFields
  }
}
    ${GoalFieldsFragmentDoc}`;

/**
 * __useListGoalsByGameAndTeamQuery__
 *
 * To run a query within a React component, call `useListGoalsByGameAndTeamQuery` and pass it any options that fit your needs.
 * When your component renders, `useListGoalsByGameAndTeamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListGoalsByGameAndTeamQuery({
 *   variables: {
 *      game: // value for 'game'
 *      team: // value for 'team'
 *   },
 * });
 */
export function useListGoalsByGameAndTeamQuery(baseOptions: Apollo.QueryHookOptions<ListGoalsByGameAndTeamQuery, ListGoalsByGameAndTeamQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListGoalsByGameAndTeamQuery, ListGoalsByGameAndTeamQueryVariables>(ListGoalsByGameAndTeamDocument, options);
      }
export function useListGoalsByGameAndTeamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListGoalsByGameAndTeamQuery, ListGoalsByGameAndTeamQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListGoalsByGameAndTeamQuery, ListGoalsByGameAndTeamQueryVariables>(ListGoalsByGameAndTeamDocument, options);
        }
export type ListGoalsByGameAndTeamQueryHookResult = ReturnType<typeof useListGoalsByGameAndTeamQuery>;
export type ListGoalsByGameAndTeamLazyQueryHookResult = ReturnType<typeof useListGoalsByGameAndTeamLazyQuery>;
export type ListGoalsByGameAndTeamQueryResult = Apollo.QueryResult<ListGoalsByGameAndTeamQuery, ListGoalsByGameAndTeamQueryVariables>;
export const CreatePlayerDocument = gql`
    mutation createPlayer($name: String!, $team: ID!) {
  createPlayer(input: {name: $name, team: $team}) {
    ...PlayerFields
  }
}
    ${PlayerFieldsFragmentDoc}`;
export type CreatePlayerMutationFn = Apollo.MutationFunction<CreatePlayerMutation, CreatePlayerMutationVariables>;

/**
 * __useCreatePlayerMutation__
 *
 * To run a mutation, you first call `useCreatePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlayerMutation, { data, loading, error }] = useCreatePlayerMutation({
 *   variables: {
 *      name: // value for 'name'
 *      team: // value for 'team'
 *   },
 * });
 */
export function useCreatePlayerMutation(baseOptions?: Apollo.MutationHookOptions<CreatePlayerMutation, CreatePlayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePlayerMutation, CreatePlayerMutationVariables>(CreatePlayerDocument, options);
      }
export type CreatePlayerMutationHookResult = ReturnType<typeof useCreatePlayerMutation>;
export type CreatePlayerMutationResult = Apollo.MutationResult<CreatePlayerMutation>;
export type CreatePlayerMutationOptions = Apollo.BaseMutationOptions<CreatePlayerMutation, CreatePlayerMutationVariables>;
export const UpdatePlayerNameDocument = gql`
    mutation updatePlayerName($id: ID!, $name: String!) {
  updatePlayer(input: {name: $name, id: $id}) {
    ...PlayerFields
  }
}
    ${PlayerFieldsFragmentDoc}`;
export type UpdatePlayerNameMutationFn = Apollo.MutationFunction<UpdatePlayerNameMutation, UpdatePlayerNameMutationVariables>;

/**
 * __useUpdatePlayerNameMutation__
 *
 * To run a mutation, you first call `useUpdatePlayerNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlayerNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlayerNameMutation, { data, loading, error }] = useUpdatePlayerNameMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdatePlayerNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePlayerNameMutation, UpdatePlayerNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePlayerNameMutation, UpdatePlayerNameMutationVariables>(UpdatePlayerNameDocument, options);
      }
export type UpdatePlayerNameMutationHookResult = ReturnType<typeof useUpdatePlayerNameMutation>;
export type UpdatePlayerNameMutationResult = Apollo.MutationResult<UpdatePlayerNameMutation>;
export type UpdatePlayerNameMutationOptions = Apollo.BaseMutationOptions<UpdatePlayerNameMutation, UpdatePlayerNameMutationVariables>;
export const DeletePlayerDocument = gql`
    mutation deletePlayer($id: ID!) {
  deletePlayer(id: $id) {
    id
  }
}
    `;
export type DeletePlayerMutationFn = Apollo.MutationFunction<DeletePlayerMutation, DeletePlayerMutationVariables>;

/**
 * __useDeletePlayerMutation__
 *
 * To run a mutation, you first call `useDeletePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePlayerMutation, { data, loading, error }] = useDeletePlayerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePlayerMutation(baseOptions?: Apollo.MutationHookOptions<DeletePlayerMutation, DeletePlayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePlayerMutation, DeletePlayerMutationVariables>(DeletePlayerDocument, options);
      }
export type DeletePlayerMutationHookResult = ReturnType<typeof useDeletePlayerMutation>;
export type DeletePlayerMutationResult = Apollo.MutationResult<DeletePlayerMutation>;
export type DeletePlayerMutationOptions = Apollo.BaseMutationOptions<DeletePlayerMutation, DeletePlayerMutationVariables>;
export const ListPlayersByTeamDocument = gql`
    query listPlayersByTeam($team: ID!) {
  players(team: $team) {
    data {
      ...PlayerFields
    }
    paginatorInfo {
      ...PaginatorInfoFields
    }
  }
}
    ${PlayerFieldsFragmentDoc}
${PaginatorInfoFieldsFragmentDoc}`;

/**
 * __useListPlayersByTeamQuery__
 *
 * To run a query within a React component, call `useListPlayersByTeamQuery` and pass it any options that fit your needs.
 * When your component renders, `useListPlayersByTeamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListPlayersByTeamQuery({
 *   variables: {
 *      team: // value for 'team'
 *   },
 * });
 */
export function useListPlayersByTeamQuery(baseOptions: Apollo.QueryHookOptions<ListPlayersByTeamQuery, ListPlayersByTeamQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListPlayersByTeamQuery, ListPlayersByTeamQueryVariables>(ListPlayersByTeamDocument, options);
      }
export function useListPlayersByTeamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListPlayersByTeamQuery, ListPlayersByTeamQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListPlayersByTeamQuery, ListPlayersByTeamQueryVariables>(ListPlayersByTeamDocument, options);
        }
export type ListPlayersByTeamQueryHookResult = ReturnType<typeof useListPlayersByTeamQuery>;
export type ListPlayersByTeamLazyQueryHookResult = ReturnType<typeof useListPlayersByTeamLazyQuery>;
export type ListPlayersByTeamQueryResult = Apollo.QueryResult<ListPlayersByTeamQuery, ListPlayersByTeamQueryVariables>;
export const PlayerCardDocument = gql`
    query playerCard($id: ID!) {
  player(id: $id) {
    ...PlayerFields
  }
}
    ${PlayerFieldsFragmentDoc}`;

/**
 * __usePlayerCardQuery__
 *
 * To run a query within a React component, call `usePlayerCardQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlayerCardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayerCardQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePlayerCardQuery(baseOptions: Apollo.QueryHookOptions<PlayerCardQuery, PlayerCardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlayerCardQuery, PlayerCardQueryVariables>(PlayerCardDocument, options);
      }
export function usePlayerCardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlayerCardQuery, PlayerCardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlayerCardQuery, PlayerCardQueryVariables>(PlayerCardDocument, options);
        }
export type PlayerCardQueryHookResult = ReturnType<typeof usePlayerCardQuery>;
export type PlayerCardLazyQueryHookResult = ReturnType<typeof usePlayerCardLazyQuery>;
export type PlayerCardQueryResult = Apollo.QueryResult<PlayerCardQuery, PlayerCardQueryVariables>;
export const ListTeamsDocument = gql`
    query listTeams($first: Int, $page: Int, $name: String, $withPlayers: Boolean) {
  teams(first: $first, page: $page, name: $name, withPlayers: $withPlayers) {
    data {
      ...TeamFields
    }
    paginatorInfo {
      ...PaginatorInfoFields
    }
  }
}
    ${TeamFieldsFragmentDoc}
${PaginatorInfoFieldsFragmentDoc}`;

/**
 * __useListTeamsQuery__
 *
 * To run a query within a React component, call `useListTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListTeamsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      page: // value for 'page'
 *      name: // value for 'name'
 *      withPlayers: // value for 'withPlayers'
 *   },
 * });
 */
export function useListTeamsQuery(baseOptions?: Apollo.QueryHookOptions<ListTeamsQuery, ListTeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListTeamsQuery, ListTeamsQueryVariables>(ListTeamsDocument, options);
      }
export function useListTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListTeamsQuery, ListTeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListTeamsQuery, ListTeamsQueryVariables>(ListTeamsDocument, options);
        }
export type ListTeamsQueryHookResult = ReturnType<typeof useListTeamsQuery>;
export type ListTeamsLazyQueryHookResult = ReturnType<typeof useListTeamsLazyQuery>;
export type ListTeamsQueryResult = Apollo.QueryResult<ListTeamsQuery, ListTeamsQueryVariables>;
export const SearchAutocompleteTeamsDocument = gql`
    query searchAutocompleteTeams($name: String, $withPlayers: Boolean) {
  teams(name: $name, withPlayers: $withPlayers) {
    data {
      ...TeamFields
    }
  }
}
    ${TeamFieldsFragmentDoc}`;

/**
 * __useSearchAutocompleteTeamsQuery__
 *
 * To run a query within a React component, call `useSearchAutocompleteTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchAutocompleteTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchAutocompleteTeamsQuery({
 *   variables: {
 *      name: // value for 'name'
 *      withPlayers: // value for 'withPlayers'
 *   },
 * });
 */
export function useSearchAutocompleteTeamsQuery(baseOptions?: Apollo.QueryHookOptions<SearchAutocompleteTeamsQuery, SearchAutocompleteTeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchAutocompleteTeamsQuery, SearchAutocompleteTeamsQueryVariables>(SearchAutocompleteTeamsDocument, options);
      }
export function useSearchAutocompleteTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchAutocompleteTeamsQuery, SearchAutocompleteTeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchAutocompleteTeamsQuery, SearchAutocompleteTeamsQueryVariables>(SearchAutocompleteTeamsDocument, options);
        }
export type SearchAutocompleteTeamsQueryHookResult = ReturnType<typeof useSearchAutocompleteTeamsQuery>;
export type SearchAutocompleteTeamsLazyQueryHookResult = ReturnType<typeof useSearchAutocompleteTeamsLazyQuery>;
export type SearchAutocompleteTeamsQueryResult = Apollo.QueryResult<SearchAutocompleteTeamsQuery, SearchAutocompleteTeamsQueryVariables>;
export const TeamDetailDocument = gql`
    query teamDetail($id: ID!) {
  team(id: $id) {
    ...TeamFields
  }
}
    ${TeamFieldsFragmentDoc}`;

/**
 * __useTeamDetailQuery__
 *
 * To run a query within a React component, call `useTeamDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamDetailQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTeamDetailQuery(baseOptions: Apollo.QueryHookOptions<TeamDetailQuery, TeamDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamDetailQuery, TeamDetailQueryVariables>(TeamDetailDocument, options);
      }
export function useTeamDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamDetailQuery, TeamDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamDetailQuery, TeamDetailQueryVariables>(TeamDetailDocument, options);
        }
export type TeamDetailQueryHookResult = ReturnType<typeof useTeamDetailQuery>;
export type TeamDetailLazyQueryHookResult = ReturnType<typeof useTeamDetailLazyQuery>;
export type TeamDetailQueryResult = Apollo.QueryResult<TeamDetailQuery, TeamDetailQueryVariables>;
export const TeamCardDocument = gql`
    query teamCard($id: ID!) {
  team(id: $id) {
    ...TeamFields
  }
}
    ${TeamFieldsFragmentDoc}`;

/**
 * __useTeamCardQuery__
 *
 * To run a query within a React component, call `useTeamCardQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamCardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamCardQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTeamCardQuery(baseOptions: Apollo.QueryHookOptions<TeamCardQuery, TeamCardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamCardQuery, TeamCardQueryVariables>(TeamCardDocument, options);
      }
export function useTeamCardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamCardQuery, TeamCardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamCardQuery, TeamCardQueryVariables>(TeamCardDocument, options);
        }
export type TeamCardQueryHookResult = ReturnType<typeof useTeamCardQuery>;
export type TeamCardLazyQueryHookResult = ReturnType<typeof useTeamCardLazyQuery>;
export type TeamCardQueryResult = Apollo.QueryResult<TeamCardQuery, TeamCardQueryVariables>;
export const UpdateTeamDocument = gql`
    mutation updateTeam($id: ID!, $name: String) {
  updateTeam(input: {id: $id, name: $name}) {
    ...TeamFields
  }
}
    ${TeamFieldsFragmentDoc}`;
export type UpdateTeamMutationFn = Apollo.MutationFunction<UpdateTeamMutation, UpdateTeamMutationVariables>;

/**
 * __useUpdateTeamMutation__
 *
 * To run a mutation, you first call `useUpdateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeamMutation, { data, loading, error }] = useUpdateTeamMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateTeamMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTeamMutation, UpdateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTeamMutation, UpdateTeamMutationVariables>(UpdateTeamDocument, options);
      }
export type UpdateTeamMutationHookResult = ReturnType<typeof useUpdateTeamMutation>;
export type UpdateTeamMutationResult = Apollo.MutationResult<UpdateTeamMutation>;
export type UpdateTeamMutationOptions = Apollo.BaseMutationOptions<UpdateTeamMutation, UpdateTeamMutationVariables>;
export const CreateTeamDocument = gql`
    mutation createTeam($name: String!) {
  createTeam(input: {name: $name}) {
    ...TeamFields
  }
}
    ${TeamFieldsFragmentDoc}`;
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, options);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const DeleteTeamDocument = gql`
    mutation deleteTeam($id: ID!) {
  deleteTeam(id: $id) {
    id
  }
}
    `;
export type DeleteTeamMutationFn = Apollo.MutationFunction<DeleteTeamMutation, DeleteTeamMutationVariables>;

/**
 * __useDeleteTeamMutation__
 *
 * To run a mutation, you first call `useDeleteTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTeamMutation, { data, loading, error }] = useDeleteTeamMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTeamMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTeamMutation, DeleteTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTeamMutation, DeleteTeamMutationVariables>(DeleteTeamDocument, options);
      }
export type DeleteTeamMutationHookResult = ReturnType<typeof useDeleteTeamMutation>;
export type DeleteTeamMutationResult = Apollo.MutationResult<DeleteTeamMutation>;
export type DeleteTeamMutationOptions = Apollo.BaseMutationOptions<DeleteTeamMutation, DeleteTeamMutationVariables>;