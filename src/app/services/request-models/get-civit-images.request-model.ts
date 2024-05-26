export interface IGetImagesRequestModel {
	limit?: number;
	period?: 'AllTime' | 'Year' | 'Month' | 'Week' | 'Day';
	page?: number;
}
